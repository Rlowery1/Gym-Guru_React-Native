/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
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
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
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
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
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
export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
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
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
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
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
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
