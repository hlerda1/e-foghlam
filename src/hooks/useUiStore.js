import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal, onOpenActModal, onCloseActModal, onCloseComModal, onOpenComModal } from '../store/ui/uiSlice';

// useSelector para acceder al state, al useSlice
export const useUiStore = () => {
  // desestructurar la unica propiedad
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const { isActModalOpen } = useSelector((state) => state.ui);
  const { isComModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  // metodo para abrir el Modal de Calendario
  // despachas el reducer
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

   // metodo para abrir el Modal de Actividad
  // despachas el reducer
  const openActModal = () => {
    dispatch(onOpenActModal());
  };

  const closeActModal = () => {
    dispatch(onCloseActModal());
  };

   // metodo para abrir el Modal de Actividad
  // despachas el reducer
  const openComModal = () => {
    dispatch(onOpenComModal());
  };

  const closeComModal = () => {
    dispatch(onCloseComModal());
  };

  // retornar propiedades y metodos definidos
  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
    isActModalOpen,
    openActModal,
    closeActModal,
    isComModalOpen,
    openComModal,
    closeComModal,
  };
};
