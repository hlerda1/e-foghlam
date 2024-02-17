import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';

// useSelector para acceder al state, al useSlice
export const useUiStore = () => {
  // desestructurar la unica propiedad
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  // metodo para abrir el Modal
  // despachas el reducer
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  // retornar propiedades y metodos definidos
  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  };
};
