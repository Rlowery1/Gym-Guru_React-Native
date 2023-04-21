import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

const DailyNutritionTipsDetails = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://edamam-recipe-search.p.rapidapi.com/search',
      params: { q: 'chicken' },
      headers: {
        'X-RapidAPI-Key': 'ad388b1d98mshf2c7750256ea7d2p1e67fcjsn4d1a44336865',
        'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setRecipes(response.data.hits);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

   return (
    <TouchableOpacity onPress={onPress}>
      <View>
      </View>
    <View style={styles.container}>
      <Text style={styles.title}>Daily Nutrition Tips</Text>
      {recipes.map((recipe, index) => (
        <Text key={index}>{recipe.recipe.label}</Text>
      ))}
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2A2D',
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DailyNutritionTipsDetails;
