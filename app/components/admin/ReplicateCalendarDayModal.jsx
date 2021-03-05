import {Modal, View, Text} from 'react-native';
import CalendarMenu from './CalendarMenu';
import {Button} from 'react-native-gesture-handler';

export default function ReplicateCalendarDayModal(props) {
  const {showReplicateModal, dateViewing} = props;

  const handleDateChange = (newDate) => {
    // Handle when calendar changes dates
    console.log('todo');
  };

  const handleDatesSelected = (date) => {
    // Add dates to current
    console.log('todo');

    // What happens when there's already activities on the same day?
  };

  const onReplicateClick = () => {
    // Replicate current activity entries to database
  }

  const onCancelClick = () => {
    // Close modal, clear state
  }

  return (
    <Modal animationType="none" transparent={true} visible={showReplicateModal}>
      <View>
        <CalendarMenu 
          showCalendar={true}
          dateViewing={dateViewing}
          handleDateChange={handleDateChange}
        />
        <View>
          <Button>
            Cancel
          </Button>
          <Button>
            Replicate
          </Button>
        </View>
      </View>
    </Modal>
  )
}