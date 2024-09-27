import ViewRequestleft from '../components/ViewRequestleft';
import ViewRequestRight from '../components/ViewRequestRight';
import '../../utils/Home.css';

export default function ViewRequest() {
  return (
    <div className='admin-dashboard'>
      <ViewRequestleft/>
      <ViewRequestRight />
    </div>
  );
}