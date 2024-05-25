import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "./bookingModal.css";
import { useContext, useState } from "react";
import { useMutation } from "react-query";

// import UserDetailContext from "../../context/UserDetail";
import { bookVisit } from "../../utils/api";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  // const {
  //   userDetails: { token },
  // } = useContext(UserDetailContext);
  // console.log(token);

  // const [value, setValue] = useState(null);

  // const { mutate, isLoading } = useMutation({
  //   mutationFn: () => bookVisit(value, propertyId, email),
  // });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter">
        <DatePicker
          // value={value} onChange={setValue}
          minDate={new Date()}
        />

        <Button
        // disabled={!value}
        //onClick={() => mutate()}
        >
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
