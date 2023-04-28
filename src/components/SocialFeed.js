import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import myImage from '../../assets/cover_photo_1.png'
import gymPhoto from '../../assets/gym_photo.jpg';
import runningPhoto from '../../assets/running_photo.jpg';
import Loading from '../components/Loading';


const PostItem = ({ item, onDelete }) => {
  const postImage = item.text === 'Great workout today!' ? gymPhoto : runningPhoto;
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image style={styles.avatar} source={myImage} />
        <Text style={styles.username}>{item.username}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Icon name="trash" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Image style={styles.postImage} source={postImage} />
      <Text style={styles.postText}>{item.text}</Text>
    </View>
  );
};

const SocialFeed = () => {
  const [data, setData] = useState([
    {
      id: 1,
      username: 'User1',
      text: 'Great workout today!',
    },
    {
      id: 2,
      username: 'User2',
      text: 'Just finished a 5-mile run!',
    },
  ]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const addNewPost = () => {
    const newPost = {
      id: data.length + 1,
      username: `User${data.length + 1}`,
      text: 'New post added!',
    };
    setData([...data, newPost]);
  };

  const removePost = (id) => {
    setData(data.filter((post) => post.id !== id));
  };

  const renderItem = ({ item }) => <PostItem item={item} onDelete={removePost} />;

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.header}>
        <Text style={styles.title}>Social Feed</Text>
        <TouchableOpacity onPress={addNewPost}>
          <Icon name="add-circle" size={30} color="#0E7C7B" />
        </TouchableOpacity>
      </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  postContainer: {
    backgroundColor: '#252525',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
    avatar: {
  width: 70,
  height: 70,
  borderRadius: 15,
  marginRight: 10,
  },
  username: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postText: {
    padding: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    marginLeft: 'auto',
    marginRight: 10,
  },
});

export default SocialFeed;

