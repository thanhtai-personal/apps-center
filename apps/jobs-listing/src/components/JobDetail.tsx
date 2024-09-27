import { useGlobalStyles } from "@/styles/globalStyle";
import { Flex, Text } from "@core-ui/react-mui-core";
import { useMemo } from "react";
import ZaloChat from "./ZaloChat";
import { formatFullDate } from "@core-utils/utils-helpers";

export const JobDetail = ({ data, restricted = false }: any) => {
  const globalStyles = useGlobalStyles();

  const jobDetail = useMemo(() => {
    return data || {}
  }, [data])

  return <Flex fullWidth column>
    <Flex fullWidth centerY>
      {/* <img src={jobDetail.thumb} style={{ height: 40 }} alt={jobDetail.id} /> */}
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textOrbiBold18} ml={0.5}>
        {!restricted && <span style={{ color: "red" }}>Job: #{jobDetail.jobId}</span>} - {jobDetail.name}
      </Text>
    </Flex>
    
    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"right"} whiteSpace={"nowrap"} color={"#F0F0F0"} className={globalStyles.textKanit12} ml={0.5} style={{ fontStyle: "italic", width: "100%" }}>
        Ngày cập nhật: {formatFullDate(jobDetail.updatedAt || jobDetail.createdAt)}
      </Text>
    </Flex>

    {!restricted && <Flex fullWidth centerY mt={4}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5}>
        Bonus:
      </Text>
    </Flex>}
    {!restricted && <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Đậu PV: {jobDetail.goldRef}
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Đi phỏng vấn: {jobDetail.goldItv}
        </Text>
      </Flex>
    </Flex>}

    {!restricted && <Flex fullWidth centerY mt={4}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5}>
        Công ty:
      </Text>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} color={"red"} ml={0.5} textTransform={"uppercase"}>
        {jobDetail.companyName}
      </Text>
    </Flex>}
    {!restricted && <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Đã tuyển: <span style={{ color: "rgb(249, 112, 102)" }}>{jobDetail.cvInprogress}</span>
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Đã mở: <span style={{ color: "rgb(249, 112, 102)" }}>{jobDetail.cvPassed}</span>
        </Text>
      </Flex>
    </Flex>}

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5}>
        Công việc:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex fullWidth column style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.htmlInfo }}>
      </Flex>
    </Flex>
    {/* <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          CVs: {jobDetail.cvInprogress}
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Số lượng: {jobDetail.cvPassed}
        </Text>
      </Flex>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Lương: {jobDetail.grossSalary}
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Số lượng: {jobDetail.number}
        </Text>
      </Flex>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Loại: {jobDetail.jobType}
        </Text>
      </Flex>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Trình độ: {jobDetail.level}
        </Text>
      </Flex>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY>
        <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanit16} ml={0.5}>
          Địa chỉ:
        </Text>
        <Text textAlign={"left"} className={globalStyles.textKanit16} ml={0.5}>
          {jobDetail.position}
        </Text>
      </Flex>
    </Flex> */}

    <Flex fullWidth centerY mt={1}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Tổng quan:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.summary }}>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Kỹ năng:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.skills }}>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Kỹ năng ưu tiên:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.prioritySkills }}>
      </Flex>
    </Flex>

    <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Phúc lợi:
      </Text>
    </Flex>
    <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.profit }}>
      </Flex>
    </Flex>

    {!restricted && <Flex fullWidth centerY mt={2}>
      <Text textAlign={"left"} whiteSpace={"nowrap"} className={globalStyles.textKanitBold16} ml={0.5} style={{ textDecoration: "underline" }}>
        Note:
      </Text>
    </Flex>}
    {!restricted && <Flex fullWidth justifyContent={"space-between"} mt={1}>
      <Flex centerY style={{
        color: "#006699",
        textAlign: "left",
        whiteSpace: "pre-line",
        fontSize: 14,
      }} dangerouslySetInnerHTML={{ __html: jobDetail.note }}>
      </Flex>
    </Flex>}
  </Flex>
}