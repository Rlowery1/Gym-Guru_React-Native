import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import ExerciseCardWrapper from './ExerciseCard';
import { API, graphqlOperation } from 'aws-amplify';
import { getUserProfile } from '../graphql/queries';
import { Auth } from 'aws-amplify';
import { getExercisesByBodyPart, getExercisesByTarget, getExercisesByEquipment } from "./exerciseAPI";

const fetchUserProfile = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    const ownerId = currentUser.attributes.sub;

    const userProfileData = await API.graphql(
      graphqlOperation(getUserProfile, { id: ownerId }),
    );
    return userProfileData.data.getUserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const WorkoutDay = ({ route }) => {
  const { week, day, days: daysPerWeek, workoutSessionId } = route.params;
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async (day, workoutDays) => {
    try {
      const userProfile = await fetchUserProfile();
      const fitnessGoal = userProfile.fitnessGoal;

      let dayExercises;

      // Adjust exercises based on the fitness goal
      switch (fitnessGoal) {
    case 'Gain':
      dayExercises = await getExercisesForGain(day, workoutDays);
      break;
    case 'Cut':
      dayExercises = await getExercisesForCut(day, workoutDays);
      break;
    case 'Strength':
      dayExercises = await getExercisesForStrength(day, workoutDays);
      break;
      }

      setExercises(dayExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const assignSetsAndReps = (exercises, sets, reps) => {
    return exercises.map((exercise) => {
      return { ...exercise, sets, reps };
    });
  };

  const getThreeDaySplitGain = async (day) => {
    let exercises;

    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByEquipment('barbell', 4)),
          ...(await getExercisesByEquipment('dumbbell', 2)),
          ...(await getExercisesByEquipment('cable', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByBodyPart('back', 3)),
          ...(await getExercisesByEquipment('dumbbell', 3)),
          ...(await getExercisesByTarget('lats', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByEquipment('barbell', 3)),
          ...(await getExercisesByEquipment('dumbbell', 3)),
          ...(await getExercisesByTarget('abs', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
        break;
    }

    return exercises;
  };

  const getThreeDaySplitCut = async (day) => {
    let exercises;
    switch (day) {
      case 1:
        exercises = [
          ...(await getExercisesByEquipment('cable', 4)),
          ...(await getExercisesByEquipment('dumbbell', 3)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 2:
        exercises = [
          ...(await getExercisesByEquipment('dumbbell', 3)),
          ...(await getExercisesByEquipment('cable', 3)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
      case 3:
        exercises = [
          ...(await getExercisesByBodyPart('cardio', 5)),
          ...(await getExercisesByTarget('abs', 2)),
          ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
}

      return exercises;
      };

  const getThreeDaySplitStrength = async (day) => {
    let exercises;

    switch (day) {
    case 1:
    exercises = [
    ...(await getExercisesByBodyPart('chest', 3)),
    ...(await getExercisesByBodyPart('shoulders', 2)),
    ...(await getExercisesByTarget('abs', 2)),
    ];
    exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
    break;
    case 2:
    exercises = [
    ...(await getExercisesByBodyPart('back', 3)),
    ...(await getExercisesByTarget('biceps', 2)),
    ...(await getExercisesByTarget('triceps', 2)),
    ];
    exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
    break;
    case 3:
    exercises = [
    ...(await getExercisesByEquipment('barbell', 3)),
    ...(await getExercisesByEquipment('dumbbell', 2)),
    ...(await getExercisesByEquipment('olympic barbell', 2)),
    ];
    exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
    break;
    }

    return exercises;
  };

  const getFourDaySplitGain = async (day) => {
  let exercises;

  switch (day) {
    case 1:
      exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 2:
      exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 2)),
        ...(await getExercisesByTarget('forearms', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 3:
      exercises = [
        ...(await getExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('traps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 4:
      exercises = [
        ...(await getExercisesByTarget('quads', 4)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByTarget('glutes', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
  }

  return exercises;
};

const getFourDaySplitCut = async (day) => {
  let exercises;

  switch (day) {
    case 1:
      exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 2:
      exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 2)),
        ...(await getExercisesByTarget('forearms', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 3:
      exercises = [
        ...(await getExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('traps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 4:
      exercises = [
        ...(await getExercisesByTarget('quads', 4)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByTarget('glutes', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
  }

  return exercises;
};

        const getFourDaySplitStrength = async (day) => {
        let exercises;

        switch (day) {
        case 1:
        exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
        break;
        case 2:
        exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 2)),
        ...(await getExercisesByTarget('forearms', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
        break;
        case 3:
        exercises = [
        ...(await getExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('traps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
        break;
        case 4:
        exercises = [
        ...(await getExercisesByTarget('quads', 4)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByTarget('glutes', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 4]);
        break;
        }

          return exercises;
        };

const getFiveDaySplitGain = async (day) => {
  let exercises;

  switch (day) {
    case 1:
      exercises = [
        ...(await getExercisesByBodyPart('chest', 5)),
        ...(await getExercisesByTarget('triceps', 3)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 2:
      exercises = [
        ...(await getExercisesByBodyPart('back', 5)),
        ...(await getExercisesByTarget('biceps', 3)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 3:
      exercises = [
        ...(await getExercisesByBodyPart('shoulders', 5)),
        ...(await getExercisesByTarget('traps', 3)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 4:
      exercises = [
        ...(await getExercisesByTarget('quads', 5)),
        ...(await getExercisesByTarget('calves', 3)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 5:
      exercises = [
        ...(await getExercisesByTarget('abs', 4)),
        ...(await getExercisesByBodyPart('cardio', 4)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
  }

  return exercises;
};

const getFiveDaySplitCut = async (day) => {
  let exercises;

  switch (day) {
    case 1:
      exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 2:
      exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 3:
      exercises = [
        ...(await getExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('traps', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 4:
      exercises = [
        ...(await getExercisesByTarget('quads', 3)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 5:
  exercises = [
    ...(await getExercisesByBodyPart('cardio', 5)),
    ...(await getExercisesByTarget('abs', 3)),
  ];
  exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
  break;
  }
  return exercises;
};
const getFiveDaySplitStrength = async (day) => {
let exercises;

        switch (day) {
        case 1:
        exercises = [
        ...(await getExercisesByBodyPart('chest', 4)),
        ...(await getExercisesByTarget('triceps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
        break;
        case 2:
        exercises = [
        ...(await getExercisesByBodyPart('back', 4)),
        ...(await getExercisesByTarget('biceps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
        break;
        case 3:
        exercises = [
        ...(await getExercisesByBodyPart('shoulders', 4)),
        ...(await getExercisesByTarget('traps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
        break;
        case 4:
        exercises = [
        ...(await getExercisesByTarget('quads', 4)),
        ...(await getExercisesByTarget('calves', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
        break;
        case 5:
        exercises = [
        ...(await getExercisesByTarget('abs', 4)),
        ...(await getExercisesByBodyPart('back', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5]);
        break;
        }

        return exercises;
        };


const getSixDaySplitGain = async (day) => {
  let exercises;

  switch (day) {
    case 1:
      exercises = [
        ...(await getExercisesByBodyPart('chest', 4)),
        ...(await getExercisesByTarget('triceps', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 2:
      exercises = [
        ...(await getExercisesByBodyPart('back', 4)),
        ...(await getExercisesByTarget('biceps', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 3:
      exercises = [
        ...(await getExercisesByTarget('quads', 4)),
        ...(await getExercisesByTarget('calves', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 4:
      exercises = [
        ...(await getExercisesByBodyPart('shoulders', 4)),
        ...(await getExercisesByTarget('traps', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 5:
      exercises = [
        ...(await getExercisesByBodyPart('chest', 2)),
        ...(await getExercisesByBodyPart('back', 2)),
        ...(await getExercisesByTarget('abs', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 6:
      exercises = [
        ...(await getExercisesByTarget('quads', 2)),
        ...(await getExercisesByBodyPart('shoulders', 2)),
        ...(await getExercisesByTarget('calves', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
  }

  return exercises;
};

const getSixDaySplitCut = async (day) => {
  let exercises;

  switch (day) {
    case 1:
      exercises = [
        ...(await getExercisesByEquipment('cable', 3)),
        ...(await getExercisesByEquipment('dumbbell', 3)),
        ...(await getExercisesByEquipment('elliptical machine', 1)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 2:
      exercises = [
        ...(await getExercisesByTarget('quads', 4)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByEquipment('elliptical machine', 1)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
      break;
    case 3:
      exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 2)),
        ...(await getExercisesByEquipment('elliptical machine', 1)),
      ];
      exercises =assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
        case 4:
        exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 2)),
        ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
        case 5:
        exercises = [
        ...(await getExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('traps', 1)),
        ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
        case 6:
        exercises = [
        ...(await getExercisesByTarget('quads', 4)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByEquipment('elliptical machine', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 15, 12, 12]);
        break;
        }

        return exercises;
        };

        const getSixDaySplitStrength = async (day) => {
        let exercises;

        switch (day) {
        case 1:
        exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
        break;
        case 2:
        exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
        break;
        case 3:
        exercises = [
        ...(await getExercisesByTarget('quads', 3)),
        ...(await getExercisesByTarget('calves', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
        break;
        case 4:
        exercises = [
        ...(await getExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('traps', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
        break;
        case 5:
        exercises = [
        ...(await getExercisesByBodyPart('chest', 1)),
        ...(await getExercisesByBodyPart('back', 1)),
        ...(await getExercisesByTarget('abs', 3)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
        break;
        case 6:
        exercises = [
        ...(await getExercisesByTarget('quads', 2)),
        ...(await getExercisesByBodyPart('shoulders', 1)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByTarget('abs', 1)),
              ];
          exercises = assignSetsAndReps(exercises, 5, [5, 5, 3, 3, 1]);
          break;
          }
          return exercises;
        };

const getSevenDaySplitGain = async (day) => {
  let exercises;

  switch (day) {
    case 1:
      exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 3)),
        ...(await getExercisesByEquipment('dumbbell', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 2:
      exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 3)),
        ...(await getExercisesByEquipment('cable', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 3:
      exercises = [
        ...(await getExercisesByTarget('quads', 4)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByEquipment('barbell', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 4:
      exercises = [
        ...(await getExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('abs', 3)),
        ...(await getExercisesByEquipment('dumbbell', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [12, 10, 8, 8]);
      break;
    case 5:
    case 6:
    case 7:
      exercises = [
        ...(await getExercisesByBodyPart('cardio', 4)),
        ...(await getExercisesByTarget('quads', 2)),
        ...(await getExercisesByBodyPart('chest', 1)),
        ...(await getExercisesByBodyPart('back', 1)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
      break;
  }

  return exercises;
};

const getSevenDaySplitCut = async (day) => {
  let exercises;

  switch (day) {
    case 1:
      exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 3)),
        ...(await getExercisesByEquipment('dumbbell', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
      break;
    case 2:
      exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 3)),
        ...(await getExercisesByEquipment('cable', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
      break;
    case 3:
      exercises = [
        ...(await getExercisesByBodyPart('upper%20legs', 2)),
        ...(await getExercisesByBodyPart('lower%20legs', 2)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByEquipment('barbell', 2)),
      ];
      exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
      break;
    case 4:
      exercises = [
        ...(awaitgetExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('abs', 3)),
        ...(await getExercisesByEquipment('dumbbell', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [15, 12, 12, 10]);
        break;
        case 5:
        case 6:
        case 7:
        exercises = [
        ...(await getExercisesByBodyPart('cardio', 4)),
        ...(await getExercisesByTarget('full body', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 4, [20, 15, 15, 12]);
        break;
        }

        return exercises;
        };

        const getSevenDaySplitStrength = async (day) => {
        let exercises;

        switch (day) {
        case 1:
        exercises = [
        ...(await getExercisesByBodyPart('chest', 3)),
        ...(await getExercisesByTarget('triceps', 3)),
        ...(await getExercisesByEquipment('dumbbell', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5, 5]);
        break;
        case 2:
        exercises = [
        ...(await getExercisesByBodyPart('back', 3)),
        ...(await getExercisesByTarget('biceps', 3)),
        ...(await getExercisesByEquipment('cable', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5, 5]);
        break;
        case 3:
        exercises = [
        ...(await getExercisesByBodyPart('upper%20legs', 2)),
        ...(await getExercisesByBodyPart('lower%20legs', 2)),
        ...(await getExercisesByTarget('calves', 2)),
        ...(await getExercisesByEquipment('barbell', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5, 5]);
        break;
        case 4:
        exercises = [
        ...(await getExercisesByBodyPart('shoulders', 3)),
        ...(await getExercisesByTarget('abs', 3)),
        ...(await getExercisesByEquipment('dumbbell', 2)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [5, 5, 5, 5, 5]);
        break;
        case 5:
        case 6:
        case 7:
        exercises = [
        ...(await getExercisesByBodyPart('cardio', 4)),
        ...(await getExercisesByBodyPart('upper%20legs', 1)),
        ...(await getExercisesByBodyPart('lower%20legs', 1)),
        ...(await getExercisesByBodyPart('chest', 1)),
        ...(await getExercisesByBodyPart('back', 1)),
        ];
        exercises = assignSetsAndReps(exercises, 5, [8, 8, 8, 8, 8]);
        break;
        }

        return exercises;
        };




  const getExercisesForGain = async (day, workoutDays) => {
  if (workoutDays === 3) {
    return await getThreeDaySplitGain(day);
  } else if (workoutDays === 4) {
    return await getFourDaySplitGain(day);
  }
    else if (workoutDays === 5) {
    return await getFiveDaySplitGain(day);
  }
    else if (workoutDays === 6) {
    return await getSixDaySplitGain(day);
  }
    else if (workoutDays === 7) {
    return await getSevenDaySplitGain(day);
  }
};

const getExercisesForCut = async (day, workoutDays) => {
  if (workoutDays === 3) {
    return await getThreeDaySplitCut(day);
  } else if (workoutDays === 4) {
    return await getFourDaySplitCut(day);
  }
  else if (workoutDays === 5) {
  return await getFiveDaySplitCut(day);// Implement logic for other workoutDays splits as needed
  }
  else if (workoutDays === 6) {
  return await getSixDaySplitCut(day);
  }
  else if (workoutDays === 7) {
  return await getSevenDaySplitCut(day);
  }
};

const getExercisesForStrength = async (day, workoutDays) => {
  if (workoutDays === 3) {
    return await getThreeDaySplitStrength(day);
  } else if (workoutDays === 4) {
    return await getFourDaySplitStrength(day);
  }
    else if (workoutDays === 5) {
    return await getFiveDaySplitStrength(day);
  }
    else if (workoutDays === 6) {
    return await getSixDaySplitStrength(day);
  }
    else if (workoutDays === 7) {
    return await getSevenDaySplitStrength(day);
  }
};

const renderItem = ({ item }) => {
  return <ExerciseCardWrapper exercise={item} workoutSessionId={workoutSessionId} />;
};



useEffect(() => {
    fetchExercises(day, daysPerWeek);
  }, [day, daysPerWeek]);


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Week {week} - Day {day}
      </Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default WorkoutDay;
