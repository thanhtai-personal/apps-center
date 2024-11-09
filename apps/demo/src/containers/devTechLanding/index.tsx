import { Flex } from "@core-ui/react-mui-core"

const DevTechLanding = () => {

  return (
    <Flex fullWidth column>
      <iframe src="https://my-core-ui.vercel.app/"
        style={{
          width: "100%",
          height: "100vh",
          border: "none"
        }}
      />
    </Flex>
  )

}

export default DevTechLanding