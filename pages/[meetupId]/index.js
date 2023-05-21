import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetailsPage = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export const getStaticPaths = async () => {
  const mongoURI =
    "mongodb+srv://habohsu930mongodb:GSTsokgyWawejPBc@meetup-cluster-0.dy9ziyv.mongodb.net/meetups?retryWrites=true&w=majority";
  const mongoClient = await MongoClient.connect(mongoURI);
  const mongoDb = mongoClient.db();

  const mongoCollection = mongoDb.collection("meetups");
  const meetupIds = await mongoCollection.find({}, { _id: 1 }).toArray();

  mongoClient.close();

  return {
    fallback: false,
    paths: meetupIds.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  // fetch data for a single meetup
  const mongoURI =
    "mongodb+srv://habohsu930mongodb:GSTsokgyWawejPBc@meetup-cluster-0.dy9ziyv.mongodb.net/meetups?retryWrites=true&w=majority";
  const mongoClient = await MongoClient.connect(mongoURI);
  const mongoDb = mongoClient.db();

  const mongoCollection = mongoDb.collection("meetups");
  const selectedMeetup = await mongoCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  mongoClient.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetailsPage;
