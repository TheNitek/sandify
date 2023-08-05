import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { FaTrash, FaCopy, FaPlusSquare } from "react-icons/fa"
import { MdOutlineFileUpload } from "react-icons/md"
import LayerEditor from "@/features/layers/LayerEditor"
import {
  selectCurrentLayer,
  selectNumLayers,
} from "@/features/layers/layersSlice"
import {
  setCurrentLayer,
  deleteLayer,
  moveLayer,
  updateLayer,
  selectAllLayers,
} from "@/features/layers/layersSlice"
import NewLayer from "./NewLayer"
import CopyLayer from "./CopyLayer"
import ImportLayer from "./ImportLayer"
import LayerList from "./LayerList"
import "./LayerManager.scss"

const LayerManager = () => {
  const dispatch = useDispatch()
  const layers = useSelector(selectAllLayers)
  const currentLayer = useSelector(selectCurrentLayer)
  const numLayers = useSelector(selectNumLayers)
  const canRemove = numLayers > 1

  const [showNewLayer, setShowNewLayer] = useState(false)
  const [showImportLayer, setShowImportLayer] = useState(false)
  const [showCopyLayer, setShowCopyLayer] = useState(false)

  const toggleNewLayerModal = () => setShowNewLayer(!showNewLayer)
  const toggleImportModal = () => setShowImportLayer(!showImportLayer)
  const toggleCopyModal = () => setShowCopyLayer(!showCopyLayer)

  const handleLayerRemoved = (id) => dispatch(deleteLayer(id))
  const handleLayerMoved = ({ oldIndex, newIndex }) =>
    dispatch(moveLayer({ oldIndex, newIndex }))
  const handleToggleLayerVisible = (id) =>
    dispatch(updateLayer({ id, visible: !currentLayer.visible }))
  const handleLayerSelected = (event) => {
    const id = event.target.closest(".list-group-item").id
    dispatch(setCurrentLayer(id))
  }
  const handleUpdateBeforeSortStart = ({ node }) =>
    dispatch(setCurrentLayer(node.id))

  useEffect(() => {
    const el = document.getElementById("layers")
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [numLayers])

  return (
    <div className="d-flex flex-column h-100">
      <NewLayer
        showModal={showNewLayer}
        toggleModal={toggleNewLayerModal}
      />
      <ImportLayer
        showModal={showImportLayer}
        toggleModal={toggleImportModal}
      />
      <CopyLayer
        showModal={showCopyLayer}
        toggleModal={toggleCopyModal}
      />
      <div className="p-3">
        <LayerList
          pressDelay={150}
          onSortEnd={handleLayerMoved}
          updateBeforeSortStart={handleUpdateBeforeSortStart}
          lockAxis="y"
          layers={layers}
          currentLayer={currentLayer}
          numLayers={numLayers}
          handleLayerSelected={handleLayerSelected}
          handleToggleLayerVisible={handleToggleLayerVisible}
        />
        <div className="d-flex align-items-center border-left border-right border-bottom">
          <Button
            className="ml-2 layer-button"
            variant="light"
            size="sm"
            data-tip="Create new layer"
            onClick={toggleNewLayerModal}
          >
            <FaPlusSquare />
          </Button>
          <Button
            className="layer-button"
            variant="light"
            data-tip="Import new layer"
            onClick={toggleImportModal}
          >
            <MdOutlineFileUpload />
          </Button>
          <div className="ml-auto">
            {canRemove && (
              <Button
                className="layer-button"
                variant="light"
                data-tip="Delete layer"
                onClick={() => handleLayerRemoved(currentLayer.id)}
              >
                <FaTrash />
              </Button>
            )}
            <Button
              className="layer-button"
              variant="light"
              data-tip="Copy layer"
              onClick={toggleCopyModal}
            >
              <FaCopy />
            </Button>
          </div>
        </div>
      </div>
      <LayerEditor
        key={currentLayer.id}
        id={currentLayer.id}
      />
    </div>
  )
}

export default LayerManager
