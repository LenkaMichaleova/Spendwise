import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import './style.css';

export const EditSessionModal = ({
  isEditSessionModalOpen,
  setIsEditSessionModalOpen,
  sessionId,
  setSession,
  sessionName,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newSessionName = e.target.sessionNameInput.value;
    setIsEditSessionModalOpen(false);

    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingSession = localStorageItems.filter(
      (item) => item.id === sessionId,
    )?.[0];
    matchingSession.sessionName = newSessionName;

    Object.assign(
      localStorageItems.find((item) => item.id === sessionId),
      matchingSession,
    );

    localStorage.setItem('items', JSON.stringify(localStorageItems));
    setSession((old) => ({ ...old, sessionName: newSessionName }));
  };

  return (
    <div className='edit-session-modal'>
      <Dialog
        // disableRestoreFocus
        className='modal'
        open={isEditSessionModalOpen}
        onClose={() => setIsEditSessionModalOpen(false)}

        >
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Edit session name</h3>
            <div className="close-btn">
              <CloseIcon onClick={() => setIsEditSessionModalOpen(false)} />
            </div>
          </div>

          <TextField
            sx={{ '& .MuiInputBase-root': { height: '50px' } }}
            className="input"
            name="sessionNameInput"
            type="text"
            label="Name"
            variant="outlined"
            defaultValue={sessionName}
            inputProps={{ maxLength: 20 }}
          />

          <Button
            className="save-btn"
            type="submit"
            variant="contained"
            style={{ backgroundColor: 'var(--primaryColor)' }}
          >
            Save
          </Button>
        </form>
      </Dialog>
    </div>
  );
};
