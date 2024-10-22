import { Flex } from "@core-ui/react-mui-core"

const JobSeeker = () => {

  return (
    <Flex fullWidth column>
      <iframe src="http://34.135.118.246:5173/jobs"
        style={{
          width: "100%",
          height: "100vh",
          border: "none"
        }}
      />
    </Flex>
  )

}

export default JobSeeker