import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetailsPage = () => {
  return (
    <MeetupDetail
      image="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
      title="First Meetup"
      address="Some Street 5, Some City"
      description="This is a first meetup"
    />
  );
};

export default MeetupDetailsPage;
