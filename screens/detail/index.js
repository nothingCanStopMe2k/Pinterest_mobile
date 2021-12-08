import Comment from "../../components/Comment";
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {Divider} from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import detail from './post';

const Detail = ({ route, navigation }) => {
    //const { item } = route.params; 
    return (
        <View>
            <DetailImage />
            <Divider width={1} orientation='vertical' />
            <DetailHeader />
        </View>
    )
}

const DetailImage = () => (
    <View
        style = {{
            width: '100%',
            height: '75%',
            position: 'relative'
        }}
    >
        <Image 
            source={{uri: 'https://picsum.photos/200/300'}} 
            style={{height: '100%', resizeMode: 'cover'}}
        />
        <TouchableOpacity style={styles.icon0}>
            <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon4}>
            <AntDesign name="ellipsis1" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon5}>
            <MaterialIcons name="image-search" size={24} color="white" />
        </TouchableOpacity>
    </View>
)

const DetailHeader = () => (
    <View
        style={{
            height: '25%',
            padding: 10,
            position: 'relative'
        }}>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.story}/>
                <View>
                    <Text style={{fontWeight: '500'}}>
                        username
                    </Text>
                    <Text style={{fontWeight: '300'}}>
                        464 người theo dõi
                    </Text>
                </View>

            </View>
            <TouchableOpacity style={styles.btn}>
                <Text>Theo dõi</Text>
            </TouchableOpacity>
        </View>
        <Text style={{
            marginTop: 10
        }}>This is my status </Text>
        
            <TouchableOpacity style={styles.icon2}>
                <Ionicons name="chatbubble" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon3}>
                <Text>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon1}>
                <AntDesign name="heart" size={40} color="black" />
            </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1.6,
        borderColor: '#ff8501',
        marginRight: 5,
    },
    btn: {
        backgroundColor: '#d3d3d3',
        borderRadius: 18,
        padding: 10
    },
    icon0: {
        position: 'absolute',
        top: 20,
        left: 10
    },
    icon4: {
        position: 'absolute',
        top: 20,
        right: 10
    },
    icon1: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    icon2: {
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    icon3: {
        backgroundColor: '#EC255A',
        borderRadius: 18,
        padding: 10,
        position: 'absolute',
        bottom: 10,
        left: '48%'
    },
    icon5: {
        position: 'absolute',
        bottom: 20,
        right: 10
    },
})
export default Detail;

//phần cũ của tình
// const detail = ({ route, navigation }) => {
//     const { item } = route.params; 
//     //console.log("Chi tiết hình ảnh:", item) // chi tiết hình ảnh, làm xong thì xóa dòng này nha <3

//   return (
//     <View>
//       <Text>This is detail screens</Text>

//       <Comment postID={item._id}/>
//     </View>
//   );
// };

// export default detail;

// const styles = StyleSheet.create({});