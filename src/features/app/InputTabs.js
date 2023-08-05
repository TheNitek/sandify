import React, { useEffect } from "react"
import { Tab, Tabs } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import MachineSettings from "@/features/machine/MachineSettings"
import LayerManager from "@/features/layers/LayerManager"
import { selectCurrentLayer } from "@/features/layers/layersSlice"
import { loadFont, supportedFonts } from "@/features/fonts/fontsSlice"
import Footer from "./Footer"

const InputTabs = () => {
  const dispatch = useDispatch()
  const layer = useSelector(selectCurrentLayer)

  useEffect(() => {
    Object.keys(supportedFonts).forEach((url) => dispatch(loadFont(url)))
  }, [dispatch])

  if (layer) {
    return (
      <Tabs
        defaultActiveKey="draw"
        id="input-tabs"
      >
        <Tab
          eventKey="draw"
          title="Layers"
          className="full-page-tab"
        >
          <LayerManager />
        </Tab>

        <Tab
          eventKey="machine"
          title="Machine"
          className="full-page-tab"
        >
          <MachineSettings />
        </Tab>

        <Tab
          eventKey="about"
          title="About"
          className="full-page-tab"
        >
          <Footer />
        </Tab>
      </Tabs>
    )
  } else {
    return <div></div>
  }
}

export default InputTabs
