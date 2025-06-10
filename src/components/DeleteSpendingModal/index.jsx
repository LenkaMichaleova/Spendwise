import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import './style.css';

export const DeleteSpendingModal = ({
  itemId,
  isDeleteSpendingModalOpen,
  setIsDeleteSpendingModalOpen,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const localStorageItems = JSON.parse(localStorage.getItem('items')) || [];
    console.log(localStorageItems);
    const itemIndex = localStorageItems.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      localStorageItems.splice(itemIndex, 1);
      localStorage.setItem('items', JSON.stringify(localStorageItems));
    }
    setIsDeleteSpendingModalOpen(false);
  };

  return (
    <>
      <Dialog
        className='spending-delete-modal'
        disableRestoreFocus
        open={isDeleteSpendingModalOpen}
        onClose={() => setIsDeleteSpendingModalOpen(false)}
      >
        <form
          className='spending-delete-form' 
          onSubmit={handleSubmit}>
          <div className="form-header">
            <div className="close-btn">
              <CloseIcon onClick={() => setIsDeleteSpendingModalOpen(false)} />
            </div>
          </div>

          <Button
            className="spending-delete-btn"
            type="submit"
            variant="contained"
            style={{ backgroundColor: 'var(--primaryColor)' }}
          >
            Delete item
          </Button>
        </form>
      </Dialog>
    </>
  );
};
