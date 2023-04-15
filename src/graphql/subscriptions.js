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
        workoutDays
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
      workoutSessions {
        items {
          id
          userId
          date
          createdAt
          updatedAt
          userWorkoutSessionsId
          owner
        }
        nextToken
      }
      lastUpdated
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
        workoutDays
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
      workoutSessions {
        items {
          id
          userId
          date
          createdAt
          updatedAt
          userWorkoutSessionsId
          owner
        }
        nextToken
      }
      lastUpdated
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
        workoutDays
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
      workoutSessions {
        items {
          id
          userId
          date
          createdAt
          updatedAt
          userWorkoutSessionsId
          owner
        }
        nextToken
      }
      lastUpdated
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
      workoutDays
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
      workoutDays
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
      workoutDays
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
          workoutDays
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        workoutSessions {
          nextToken
        }
        lastUpdated
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
          workoutDays
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        workoutSessions {
          nextToken
        }
        lastUpdated
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
          workoutDays
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        workoutSessions {
          nextToken
        }
        lastUpdated
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
export const onCreateWorkoutSession = /* GraphQL */ `
  subscription OnCreateWorkoutSession(
    $filter: ModelSubscriptionWorkoutSessionFilterInput
    $owner: String
  ) {
    onCreateWorkoutSession(filter: $filter, owner: $owner) {
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
          workoutDays
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        workoutSessions {
          nextToken
        }
        lastUpdated
        createdAt
        updatedAt
        owner
      }
      date
      exercises {
        items {
          id
          workoutSessionId
          exerciseId
          name
          sets
          reps
          weights
          createdAt
          updatedAt
          workoutSessionExercisesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      userWorkoutSessionsId
      owner
    }
  }
`;
export const onUpdateWorkoutSession = /* GraphQL */ `
  subscription OnUpdateWorkoutSession(
    $filter: ModelSubscriptionWorkoutSessionFilterInput
    $owner: String
  ) {
    onUpdateWorkoutSession(filter: $filter, owner: $owner) {
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
          workoutDays
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        workoutSessions {
          nextToken
        }
        lastUpdated
        createdAt
        updatedAt
        owner
      }
      date
      exercises {
        items {
          id
          workoutSessionId
          exerciseId
          name
          sets
          reps
          weights
          createdAt
          updatedAt
          workoutSessionExercisesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      userWorkoutSessionsId
      owner
    }
  }
`;
export const onDeleteWorkoutSession = /* GraphQL */ `
  subscription OnDeleteWorkoutSession(
    $filter: ModelSubscriptionWorkoutSessionFilterInput
    $owner: String
  ) {
    onDeleteWorkoutSession(filter: $filter, owner: $owner) {
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
          workoutDays
          updatedAt
          createdAt
          owner
        }
        workouts {
          nextToken
        }
        workoutSessions {
          nextToken
        }
        lastUpdated
        createdAt
        updatedAt
        owner
      }
      date
      exercises {
        items {
          id
          workoutSessionId
          exerciseId
          name
          sets
          reps
          weights
          createdAt
          updatedAt
          workoutSessionExercisesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      userWorkoutSessionsId
      owner
    }
  }
`;
export const onCreateSessionExercise = /* GraphQL */ `
  subscription OnCreateSessionExercise(
    $filter: ModelSubscriptionSessionExerciseFilterInput
    $owner: String
  ) {
    onCreateSessionExercise(filter: $filter, owner: $owner) {
      id
      workoutSessionId
      workoutSession {
        id
        userId
        user {
          id
          profileId
          lastUpdated
          createdAt
          updatedAt
          owner
        }
        date
        exercises {
          nextToken
        }
        createdAt
        updatedAt
        userWorkoutSessionsId
        owner
      }
      exerciseId
      name
      sets
      reps
      weights
      createdAt
      updatedAt
      workoutSessionExercisesId
      owner
    }
  }
`;
export const onUpdateSessionExercise = /* GraphQL */ `
  subscription OnUpdateSessionExercise(
    $filter: ModelSubscriptionSessionExerciseFilterInput
    $owner: String
  ) {
    onUpdateSessionExercise(filter: $filter, owner: $owner) {
      id
      workoutSessionId
      workoutSession {
        id
        userId
        user {
          id
          profileId
          lastUpdated
          createdAt
          updatedAt
          owner
        }
        date
        exercises {
          nextToken
        }
        createdAt
        updatedAt
        userWorkoutSessionsId
        owner
      }
      exerciseId
      name
      sets
      reps
      weights
      createdAt
      updatedAt
      workoutSessionExercisesId
      owner
    }
  }
`;
export const onDeleteSessionExercise = /* GraphQL */ `
  subscription OnDeleteSessionExercise(
    $filter: ModelSubscriptionSessionExerciseFilterInput
    $owner: String
  ) {
    onDeleteSessionExercise(filter: $filter, owner: $owner) {
      id
      workoutSessionId
      workoutSession {
        id
        userId
        user {
          id
          profileId
          lastUpdated
          createdAt
          updatedAt
          owner
        }
        date
        exercises {
          nextToken
        }
        createdAt
        updatedAt
        userWorkoutSessionsId
        owner
      }
      exerciseId
      name
      sets
      reps
      weights
      createdAt
      updatedAt
      workoutSessionExercisesId
      owner
    }
  }
`;
