import CallRequestModal from '../components/CallRequestModal';

function QuickContactPage() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <CallRequestModal isOpen={true} onClose={() => {}} />
    </div>
  );
}

export default QuickContactPage;
