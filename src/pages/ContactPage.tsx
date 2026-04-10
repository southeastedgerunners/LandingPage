import IntakeFormModal from '../components/IntakeFormModal';

function ContactPage() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <IntakeFormModal isOpen={true} onClose={() => {}} />
    </div>
  );
}

export default ContactPage;
