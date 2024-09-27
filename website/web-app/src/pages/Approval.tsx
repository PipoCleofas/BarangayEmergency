import Approvalleft from '../components/Approvalleft';
import ApprovalRight from '../components/ApprovalRight';
import '../../utils/Home.css';

export default function Approval() {
  return (
    <div className='admin-dashboard'>
      <Approvalleft />
      <ApprovalRight />
    </div>
  );
}