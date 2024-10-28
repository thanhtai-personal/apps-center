import "@core-ui/react-flow/dist/styles.css"
import { PAGE_MAX_WIDTH } from "@/utils/constants";
import {
  AnnotationNode, CircleNode, Diagrams, ButtonEdge
  , ResizerNode, TextNode, TextInputNode, ToolbarNode
  , useReactFlowController,
  FrameNode,
  AnimatedNodeEdge1,
  AnimatedSVGEdge
} from "@core-ui/react-flow";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text, useResponsive } from "@core-ui/react-mui-core";
import jsonData from "@/assets/json/sourcecode-struct.json";
import { useStore } from "@/store/index";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@core-ui/react-mui-core/materials";

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextInputNode,
  text: TextNode,
  frame: FrameNode,
};

const edgeTypes: any = {
  button: ButtonEdge,
  animate1: AnimatedNodeEdge1,
  svg: AnimatedSVGEdge,
};

const nodeClassName = (node) => node.type;

export const BestPractice = observer(() => {
  const { notiStore } = useStore();
  const globalStyles = useGlobalStyles();
  const { tabletSizeDown } = useResponsive();
  const { getText } = useLanguage(bestPracticeLangObj);

  const {
    nodes, edges, colorMode,
    onNodesChange,
    onEdgesChange,
    onNodesDelete,
    onConnect,
    onChangeThemeMode
  } = useReactFlowController(jsonData.nodes as any[], jsonData.edges as any[]);

  return (
    <Flex fullSize center px={2}>
      <Flex fullSize column center maxWidth={PAGE_MAX_WIDTH} px={4} py={2}
        borderRadius={"16px"} position={"relative"}>
        <Text mb={2} textAlign={"center"} className={tabletSizeDown ? globalStyles.textOrbiBold24
          : globalStyles.textOrbiBold32}>
          {getText("App Center architechture")}
        </Text>
        <Diagrams.Base nodes={nodes} edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onConnect={onConnect}
          fitView
          colorMode={colorMode}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          configFlags={{
            useMinimap: !tabletSizeDown,
            useControls: !tabletSizeDown,
          }}
          panels={[{
            id: "top-right",
            position: "top-right",
            nodes: [{
              id: "copy-json",
              render: () => {
                return (
                  <Button
                    id={"copy-json"}
                    onClick={() => {
                      const copiedText = JSON.stringify({
                        nodes, edges,
                      });
                      navigator.clipboard.writeText(copiedText);
                      notiStore.messageQueue?.push({
                        children: "Copied JSON to clipboard!",
                        variant: "success"
                      });
                    }}
                  >
                    <Text color={"white"}>Copy JSON data</Text>
                  </Button>
                )
              }
            },
            {
              id: "themed-button",
              render: () => {
                return (
                  <select onChange={onChangeThemeMode} id="colormode-select"
                    style={{ color: "white" }}
                  >
                    <option value="dark">dark</option>
                    <option value="light">light</option>
                    <option value="system">system</option>
                  </select>
                )
              }
            }]
          }]}
        />
      </Flex>
    </Flex>
  )
})



const bestPracticeLangObj = {
  "VI": {
    "App Center architechture": "Kiến trúc ứng dụng App Center",
  }
}