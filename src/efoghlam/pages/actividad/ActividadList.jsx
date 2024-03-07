import { TablaActividad } from '../../components/TablaActividad';
import { ActividadModal } from './ActividadModal';
import { FabAddNewAct } from '../../components/FabAddNewAct';

export const ActividadList = () => {
  
  return(
  <>
    <TablaActividad />
    <ActividadModal />
    <FabAddNewAct />
  </>
  )    
}