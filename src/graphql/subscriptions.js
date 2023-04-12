/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      profileId
      profile {
        id
        name
        age
        weight
        height
        gender
        fitnessGoal
        updatedAt
        createdAt
        owner
      }
      workouts {
        items {
          id
          userId
          name
          createdAt
          updatedAt
          userWorkoutsId
          owner
        }
        nextToken
      }
      lastUpdated
      setLastUpdated
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      profileId
      profile {
        id
        name
        age
        weight
        height
        gender
        fitnessGoal
        updatedAt
        createdAt
        owner
      }
      workouts {
        items {
          id
          userId
          name
          createdAt
          updatedAt
          userWorkoutsId
          owner
        }
        nextToken
      }
      lastUpdated
      setLastUpdated
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      profileId
      profile {
        id
        name
        age
        weight
        height
        gender
        fitnessGoal
        updatedAt
        createdAt
        owner
      }
      workouts {
        items {
          id
          userId
          name
          createdAt
          updatedAt
          userWorkoutsId
          owner
        }
        nextToken
      }
      lastUpdated
      setLastUpdated
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onCreateUserProfile(filter: $filter, owner: $owner) {
      id
      name
      age
      weight
      height
      gender
      fitnessGoal
      updatedAt
      createdAt
      owner
    }
  }
`;
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onUpdateUserProfile(filter: $filter, owner: $owner) {
      id
      name
      age
      weight
      height
      gender
      fitnessGoal
      updatedAt
      createdAt
      owner
    }
  }
`;
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $owner: String
  ) {
    onDeleteUserProfile(filter: $filter, owner: $owner) {
      id
      name
      age
      weight
      height
      gender
      fitnessGoal
      updatedAt
      createdAt
      owner
    }
  }
`;
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onCreateWorkout(filter: $filter, owner: $owner) {
      id
      userId
      user {
        id
        profileId
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        lastUpdated
        setLastUpdated
        createdAt
        updatedAt
        owner
      }
      name
      exercises {
        items {
          id
          workoutId
          name
          description
          sets
          reps
          duration
          createdAt
          updatedAt
          workoutExercisesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      userWorkoutsId
      owner
    }
  }
`;
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onUpdateWorkout(filter: $filter, owner: $owner) {
      id
      userId
      user {
        id
        profileId
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        lastUpdated
        setLastUpdated
        createdAt
        updatedAt
        owner
      }
      name
      exercises {
        items {
          id
          workoutId
          name
          description
          sets
          reps
          duration
          createdAt
          updatedAt
          workoutExercisesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      userWorkoutsId
      owner
    }
  }
`;
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onDeleteWorkout(filter: $filter, owner: $owner) {
      id
      userId
      user {
        id
        profileId
        profile {
          id
          name
          age
          weight
          height
          gender
          fitnessGoal
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        lastUpdated
        setLastUpdated
        createdAt
        updatedAt
        owner
      }
      name
      exercises {
        items {
          id
          workoutId
          name
          description
          sets
          reps
          duration
          createdAt
          updatedAt
          workoutExercisesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      userWorkoutsId
      owner
    }
  }
`;
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onCreateExercise(filter: $filter, owner: $owner) {
      id
      workoutId
      workout {
        id
        userId
        user {
          id
          profileId
          lastUpdated
          setLastUpdated
          createdAt
          updatedAt
          owner
        }
        name
        exercises {
          nextToken
        }
        createdAt
        updatedAt
        userWorkoutsId
        owner
      }
      name
      description
      sets
      reps
      duration
      createdAt
      updatedAt
      workoutExercisesId
      owner
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onUpdateExercise(filter: $filter, owner: $owner) {
      id
      workoutId
      workout {
        id
        userId
        user {
          id
          profileId
          lastUpdated
          setLastUpdated
          createdAt
          updatedAt
          owner
        }
        name
        exercises {
          nextToken
        }
        createdAt
        updatedAt
        userWorkoutsId
        owner
      }
      name
      description
      sets
      reps
      duration
      createdAt
      updatedAt
      workoutExercisesId
      owner
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise(
    $filter: ModelSubscriptionExerciseFilterInput
    $owner: String
  ) {
    onDeleteExercise(filter: $filter, owner: $owner) {
      id
      workoutId
      workout {
        id
        userId
        user {
          id
          profileId
          lastUpdated
          setLastUpdated
          createdAt
          updatedAt
          owner
        }
        name
        exercises {
          nextToken
        }
        createdAt
        updatedAt
        userWorkoutsId
        owner
      }
      name
      description
      sets
      reps
      duration
      createdAt
      updatedAt
      workoutExercisesId
      owner
    }
  }
`;
