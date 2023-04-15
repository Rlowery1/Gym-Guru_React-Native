/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
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
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        workoutId
        workout {
          id
          userId
          name
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
      nextToken
    }
  }
`;
export const getWorkoutSession = /* GraphQL */ `
  query GetWorkoutSession($id: ID!) {
    getWorkoutSession(id: $id) {
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
export const listWorkoutSessions = /* GraphQL */ `
  query ListWorkoutSessions(
    $filter: ModelWorkoutSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkoutSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSessionExercise = /* GraphQL */ `
  query GetSessionExercise($id: ID!) {
    getSessionExercise(id: $id) {
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
export const listSessionExercises = /* GraphQL */ `
  query ListSessionExercises(
    $filter: ModelSessionExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessionExercises(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        workoutSessionId
        workoutSession {
          id
          userId
          date
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
      nextToken
    }
  }
`;
