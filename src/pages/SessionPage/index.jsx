import './style.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { BackButton } from '../../components/BackButton';
import { SessionItem } from '../../components/SessionItem';
import { ReusableBtn } from '../../components/ReusableBtn';
import { ReusableModal } from '../../components/ReusableModal';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LimitDonut } from '../../components/LimitDonut';
import { useParams } from 'react-router-dom';
import { LimitModal } from '../../components/LimitModal';
import { EditSessionModal } from '../../components/EditSessionModal';

export const SessionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isEditSessionModalOpen, setIsEditSessionModalOpen] = useState(false);
  const [session, setSession] = useState();

  const navigate = useNavigate();
  const { sessionId } = useParams();

  const localStorageItems = JSON.parse(localStorage.getItem('items')) ?? [];
  const sessionItems = localStorageItems?.find((item) => item.id === sessionId)?.items ?? [];

  const totalPrice = sessionItems.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);

  const handleSubmit = (obj) => {
    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingSession = localStorageItems.filter(
      (item) => item.id === sessionId,
    )?.[0];

    const currentItems = matchingSession.items ?? [];
    matchingSession.items = [...currentItems, obj];

    Object.assign(
      localStorageItems.find((item) => item.id === sessionId),
      matchingSession,
    );
    localStorage.setItem('items', JSON.stringify(localStorageItems));
    setSession({ ...matchingSession });
  };

  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingSession = localStorageItems.filter(
      (item) => item.id === sessionId,
    );
    setSession(matchingSession[0]);
  }, [sessionId]);

  const sessionLimit = session?.sessionLimit;
  const sessionName = session?.sessionName;
  const sessionTotal = session?.price;

    useEffect(() => {
    if (session) {
      setSession((old) => ({ ...old, price: totalPrice }));
      setSession((old) => {
        const updated = { ...old, price: totalPrice };
        const index = localStorageItems.findIndex(
          (item) => item.id === sessionId,
        );
        if (index !== -1) {
          localStorageItems[index] = updated;
          localStorage.setItem('items', JSON.stringify(localStorageItems));
        }
        return updated;
      });
    }
  }, [totalPrice]);

  return (
    <div className="content session-content">
      <BackButton path="/HomePage" />
      <div className="session-header">
        <div className="session-edit"

          >
          <h1
            onClick={() => {
              setIsEditSessionModalOpen(!isEditSessionModalOpen);
            }}>
            {sessionName}
          </h1>
          <EditOutlinedIcon 
            onClick={() => {
              setIsEditSessionModalOpen(!isEditSessionModalOpen);
            }}
          />
          <EditSessionModal
            isEditSessionModalOpen={isEditSessionModalOpen}
            setIsEditSessionModalOpen={setIsEditSessionModalOpen}
            sessionId={sessionId}
            setSession={setSession}
            sessionName={sessionName}
          />
        </div>
        <div
          role="button"
          className="session-menu"
          onClick={() => navigate(`/Menu/${sessionId}`)}
        >
          <CameraAltOutlinedIcon />
          <span>Menu</span>
        </div>
      </div>

      <div className="session-btn">
        <ReusableBtn
          title="Add Spending"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="session__items-box">
        {sessionItems?.map((item, index) => (
          <SessionItem
            count={item.count}
            key={`${item.name}-${index}`}
            id={index}
            name={item.name}
            price={item.price}
            setSession={setSession}
          />
        ))}
      </div>

      <div className="limit-price-wrapper">
        <div className="limit">
          <span className="limit-header">Limit:</span>
          <span className="limit-edit">
            <span>
              <strong>
                {session?.sessionLimit === 0
                  ? ' - '
                  : `${session?.sessionLimit},-`}
              </strong>
            </span>
            <span>
              <LimitModal
                isLimitModalOpen={isLimitModalOpen}
                sessionLimit={sessionLimit}
                setIsLimitModalOpen={setIsLimitModalOpen}
                sessionId={sessionId}
                setSession={setSession}
              />
              <span className="change-limit">
                <EditOutlinedIcon
                  onClick={() => {
                    setIsLimitModalOpen(!isLimitModalOpen);
                  }}
                />
              </span>
            </span>
          </span>
        </div>

        <div className="limit-donut">
          {session?.sessionLimit !== 0 && (
            <LimitDonut spent={totalPrice} free={sessionLimit - totalPrice} />
          )}
        </div>

        <div className="price-wrapper">
          <div>Total:</div>
          <div>
            <strong>{totalPrice}</strong> ,-
          </div>
        </div>
      </div>

      <ReusableModal
        title="Add Item"
        itemName={true}
        itemPrice={true}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
