import { Container, Flex } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { LCard } from "../../Cards/LCard";
import SkeletonHome from "../layout/SkeletonHome";
import { getActivitiesList } from "./activitiesService";

export const ActivitiesList = ({ getOnlyLatest }) => {
  const [activities, setActivities] = useState([]);
  const filterLatestActivities = (activities) => {
    const index = activities.length - 3;
    const filteredActivities = activities.slice(index);
    return filteredActivities;
  };

  useEffect(() => {
    if (getOnlyLatest === true) {
      getActivitiesList().then((activities) =>
        setActivities(filterLatestActivities(activities))
      );
    } else {
      getActivitiesList()
        .then((aList) => setActivities(aList))
        .catch((error) => console.log(error));
    }
  }, [getOnlyLatest]);

  return (
    <Container maxW="-moz-min-content">
      {activities.length > 0 ? (
        <Flex flexWrap="wrap" justifyContent="center">
          {activities.map((activity, index) => (
            <Flex margin="0.5em" mt="3em" mb="3em" key={index}>
              <LCard
                image={activity.image}
                title={activity.name}
                text={activity.description}
                url="actividades"
                id={activity.id}
                postedOn={activity.created_at}
                maxW="sm"
              />
            </Flex>
          ))}
        </Flex>
      ) : (
        <SkeletonHome />
      )}
    </Container>
  );
};
