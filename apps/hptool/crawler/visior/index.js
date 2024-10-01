const _ = require("lodash");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const { composeAsync, fetchHtmlFromUrl } = require("../helper");
const shell = require("shelljs");

const replaceAllObj = {
  "028 7305 2929": "0981 168 252",
  "www.visior.vn":
    "www.hptool.vn.vn<br />Fanpage: https://www.facebook.com/hoangphattool",
  "info@visior.vn": "hoangphatequ@gmail.com",
  "Showroom chuyên nghiệp: 12 Ký con, Phường Nguyễn Thái Bình, Quận 01, Tp Hồ Chí Minh":
    "Địa chỉ: 340/2/3 Nguyễn Văn Lượng",
  "showroom chuyên nghiệp: 12 Ký con, Phường Nguyễn Thái Bình, Quận 01, Tp Hồ Chí Minh":
    "Địa chỉ: 340/2/3 Nguyễn Văn Lượng",
  "12 Ký con, Phường Nguyễn Thái Bình, Quận 01, Tp Hồ Chí Minh":
    "340/2/3 Nguyễn Văn Lượng",
  "Visior.vn": "Hoàng Phát Tool",
  "visior.vn": "Hoàng Phát Tool",
};

const replaceAllString = (str) => {
  let _str = str;
  Object.keys(replaceAllObj).forEach((key) => {
    _str = _str.replaceAll(key, replaceAllObj[key]);
  });
  return _str;
};

// truyencv (Base URL)
const VISIOR_BASE = "https://visior.vn";

const extractVisioData = async ($root) => {
  try {
    shell.touch("log.txt");

    console.log("START CONNECT--------", process.env.DATABASE_URL);
    const client = new MongoClient(process.env.DATABASE_URL);
    console.log("CREATE CONNECTION SUCCESSFULLY--------");
    await client.connect();
    const database = client.db("sale_web");
    const categoryCollection = await database.collection("category");
    const productCollection = await database.collection("product");
    const imageCollection = await database.collection("image");
    const branchCollection = await database.collection("branch");
    console.log("CONNECT SUCCESSFULLY--------");

    console.log("FETCH branch");
    const branchElems = $root(".brand-slide a");
    const logoElems = $root(".brand-slide a img");
    const branchData = [...(branchElems || [])].map(
      (elem) => elem?.attribs?.href
    );
    const logoData = [...(logoElems || [])].map((elem, index) => {
      return {
        path: branchData[index],
        logo: elem?.attribs["data-src"] || elem?.attribs.src,
      };
    });
    for (item of logoData) {
      const name = new URLSearchParams(item.path).get("q");
      console.log("Inserting branch" + name);
      try {
        const insertedImage = await imageCollection.insertOne({
          url: item.logo,
          alt_name: `logo ${name}`,
          is_delete: false,
        });
        const insertedBranch = await branchCollection.insertOne({
          name,
          logo: insertedImage.insertedId,
          is_delete: false,
        });
        console.log(
          "Inserting branch success with id " + insertedBranch.insertedId
        );
      } catch (error) {
        console.log("Inserting branch failed");
      }
    }

    const $productsPage = await fetchHtmlFromUrl(`${VISIOR_BASE}/product`);
    const categoryElems = $productsPage(".nav-link");
    const categoriesData = [...(categoryElems || [])].map((elem) => {
      return {
        name: elem.children[0].data || elem.text(),
        path: elem?.attribs?.href,
      };
    });
    for (item of categoriesData) {
      try {
        if (item.name && item.path) {
          console.log("Inserting category data", item.name, item.path);
          const insertedCategory = await categoryCollection.insertOne({
            name: item.name,
            is_delete: false,
          });
          const categories = [item.name]; // Product data
          console.log(
            "Inserted category with name: " +
              item.name +
              " id: " +
              insertedCategory.insertedId
          );
          await shell.exec(
            `echo "FETCHING DATA CATEGORY: ${VISIOR_BASE}${item.path}" >> ./log.txt`
          );
          const $category = await fetchHtmlFromUrl(
            `${VISIOR_BASE}${item.path}`
          );
          let pagingLast = await $category(".paging-last");
          if (pagingLast) {
            const lastPagePath = pagingLast[0]?.attribs?.href;
            const maxPage = /page=(\d+)/.exec(lastPagePath)[1];
            if (maxPage) {
              for (let page = 1; page <= maxPage; page++) {
                try {
                  const $categoryPage = await fetchHtmlFromUrl(
                    `${VISIOR_BASE}${
                      item.path === "/" ? "" : item.path
                    }?page=${page}`
                  );
                  const products = await $categoryPage(
                    ".product-col .image_link"
                  );
                  if (products) {
                    for (productElem of [...products]) {
                      const productDetailPath = productElem?.attribs?.href;
                      try {
                        if (productDetailPath) {
                          const $productPage = await fetchHtmlFromUrl(
                            `${VISIOR_BASE}${productDetailPath}`
                          );

                          const nameElem = await $productPage(".title-product");
                          const name = nameElem[0]
                            ? nameElem[0].children[0].data
                            : ""; // Product data

                          const branchElem = await $productPage(
                            ".first_status .status_name"
                          );
                          const branch = branchElem[0]
                            ? branchElem[0].children[0].data
                            : ""; // Product data
                          try {
                            console.log("Inserting branch data", branch);
                            const row = await branchCollection.findOne({
                              name: branch?.toLowerCase(),
                            });
                            if (!row) {
                              const insertedBranch =
                                await branchCollection.insertOne({
                                  name: branch?.toLowerCase(),
                                  description: "",
                                  is_delete: false,
                                });
                              console.log("Inserting branch data success");
                            }
                          } catch (error) {
                            console.log("Inserting branch data failed", error);
                          }

                          const pTexts = await $productPage(".pview-sku p");
                          const infos = [...(pTexts || [])].map(
                            (pT) => pT.children[0].data
                          );
                          const info = {}; // Product data
                          for (let item of infos) {
                            if (item.includes("Mã sản phẩm")) {
                              info.code = item.split(": ")[1];
                            }
                            if (item.includes("Thương hiệu")) {
                              info.branch = item.split(": ")[1];
                            }
                            if (item.includes("Xuất xứ")) {
                              info.origin = item.split(": ")[1];
                            }
                            if (item.includes("Thời gian bảo hành")) {
                              info.warranty_time = item.split(": ")[1];
                            }
                          }

                          const descriptionElem = await $productPage(
                            "#tab-1 .rte"
                          );
                          const description = descriptionElem.html(); // Product data

                          const techniqueElem = await $productPage(
                            "#tab-3 .rte"
                          );
                          const technique = techniqueElem.html(); // Product data

                          const videos = []; // Product data
                          const videosElem = await $productPage(
                            ".videoProduct iframe"
                          );
                          for (item of [...(videosElem || [])]) {
                            videos.push(
                              `<iframe width="100%" height="315" src="${item.attribs["data-src"]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                            );
                          }

                          const priceElem = await $productPage(
                            ".special-price .product-price"
                          );
                          const price = priceElem[0]
                            ? priceElem[0].children[0].data
                            : ""; // Product data

                          const imagesElem = await $productPage(".item img");
                          const images = []; // Product data
                          let thumb = null; // Product data
                          let indexing = 1;
                          for (imageItem of [...(imagesElem || [])]) {
                            console.log("Inserting image data");
                            const url = imageItem?.attribs["data-image"];
                            const src = imageItem?.attribs["src"];
                            let alt_name = `${name}_${indexing}`;
                            indexing++;

                            try {
                              const insertedImage =
                                await imageCollection.insertOne({
                                  url: url || src || "",
                                  alt_name: alt_name || "unknown image",
                                  is_delete: false,
                                });
                              images.push(insertedImage.insertedId);
                              if (!thumb) {
                                thumb = insertedImage.insertedId;
                              }
                              console.log(
                                "Inserted image with id: " +
                                  insertedImage.insertedId
                              );
                            } catch (error) {
                              console.log(
                                "Insert image failed - ignore image "
                              );
                            }
                          }

                          const requestPrdData = {
                            name,
                            branch: branch || info.branch,
                            categories,
                            warranty_time: info.warranty_time,
                            original: info.origin,
                            code: info.code,
                            description: replaceAllString(description),
                            technique: replaceAllString(technique),
                            videos,
                            images,
                            thumb,
                            quantity: 0,
                            sold: 0,
                            remain: 0,
                            rating: 5,
                            price: parseFloat(
                              price ? price.replaceAll(",", "") : 0
                            ),
                            sku: "",
                            model: "",
                            engine: "",
                            short_description: "",
                            gifts: [],
                            is_delete: false,
                          };
                          console.log("Inserting product " + name);
                          try {
                            const insertedProduct =
                              await productCollection.insertOne(requestPrdData);
                            console.log(
                              "Inserted product with id: " +
                                insertedProduct.insertedId
                            );

                            await shell.exec(
                              `echo "SUCCESS --- Inserted product with id: ${insertedProduct.insertedId} - ${name}" >> ./log.txt`
                            );
                          } catch (error) {
                            console.log(
                              "Insert product failed - IGNORE " + name
                            );
                            await shell.exec(
                              `echo "FAILED --- Insert product failed: ${VISIOR_BASE}${productDetailPath} ${
                                error.message || ""
                              }" >> ./log.txt`
                            );
                          }
                        }
                      } catch (error) {
                        console.log(
                          "load product detail failed - IGNORE " +
                            productDetailPath
                        );
                        await shell.exec(
                          `echo "FAILED --- load product detail failed: ${VISIOR_BASE}${productDetailPath} ${
                            error.message || ""
                          }" >> ./log.txt`
                        );
                      }
                    }
                  }
                } catch (error) {
                  console.log(
                    "load categories products failed - IGNORE Page " + page
                  );

                  await shell.exec(
                    `echo "FAILED --- load categories products failed - IGNORE Page: ${VISIOR_BASE}${item.path}?page=${page}" >> ./log.txt`
                  );
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(
          "load categoriesData failed - IGNORE " + categoriesData.name
        );
        await shell.exec(
          `echo "FAILED --- load categoriesData failed - IGNORE" >> ./log.txt`
        );
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

const fetchDataVisio = async () => {
  return composeAsync(extractVisioData, fetchHtmlFromUrl)(VISIOR_BASE);
};

module.exports = fetchDataVisio;
