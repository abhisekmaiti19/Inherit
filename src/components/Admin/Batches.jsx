import { Box } from "@chakra-ui/react"
import CreateBatch from "./CreateBatch"
import PublishedBatches from "./PublishedBatches"

const Batches = () => {
  return (
    <Box>
        <CreateBatch />
        <PublishedBatches />
    </Box>
  )
}

export default Batches