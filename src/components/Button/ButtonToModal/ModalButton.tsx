export default function ModalButton({ children, handleclick }) {
  return (
    <>
      <button onClick={handleclick}>{children}</button>
    </>
  );
}
