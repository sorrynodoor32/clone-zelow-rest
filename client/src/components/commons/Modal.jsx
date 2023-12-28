import { useAppStore } from "~/store/useAppStore"

const Modal = () => {
  const {modalChildren, setModal} = useAppStore()
  return (
    <div
      onClick={() => setModal(false, null)}
      className="absolute flex items-center justify-center z-[999] top-0 h-screen left-0 w-screen bg-overlay-50"
    >
      {modalChildren}
    </div>
  )
}

export default Modal
