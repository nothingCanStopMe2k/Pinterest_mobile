import React from "react";
import { useSelector } from "react-redux";
import { useForm, useController } from "react-hook-form";

import { StyleSheet, Text, View } from "react-native";

import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";

import { fileService } from "../services/file.service";
import { userService } from "../services/user.service";

const Comment = ({ postID }) => {
    const [allCommentOfPhoto, setAllCommentOfPhoto] = React.useState([]);
    const user = useSelector(state => state.userReducer.user);
    const { control, handleSubmit } = useForm();

    React.useEffect(() => {
        fileService.getAllCommentById(postID)
          .then(res => setAllCommentOfPhoto(res))
          .catch(err => console.log("ERR: ", err.message));
    }, []);

    //console.log("Tất cả bình luận", allCommentOfPhoto); // bình luận, làm xong xóa giúp nha <3

    const onSubmit = async (data) => {
      const formData = {
        userID: user._id,
        postID: postID,
        ownerName: user.firstName + " " + user.lastName,
        linkAvatar: user.profilePhoto,
        content: data.content
      }

      await userService.postComment(formData)
      .then(() => {
        console.log("thành công")
      })
      .catch(err => {
        console.log("fail")
      });
    };

  return (
    <View>
      <Text>This is Comment</Text>
      
      {/* ô nhập bình luận */}
      <AppTextInput
          placeholder="Write your comment"
          autoCapitalize="none"
          autoCorrect={false}
          name="content" //tên giá trị nhập
          control={control} //láy giá trị nhập
        />

      <AppButton
          title="Send"
          bgcolor="red"
          tcolor="white1"
          onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});



//Phần giao diện của toàn
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import {Divider} from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'; 

const Detail = ({ route, navigation }) => {
    //const { item } = route.params; 
    return (
        <View>
            <DetailHeader />
        </View>
    )
}

const DetailHeader = () => (
    <View
    style={{
        height: '100%',
        padding: 10,
    }}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 5
        }}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: -2}}>
                <AntDesign name="close" size={24} color="black"/>
            </TouchableOpacity>
            <Text
                style={{fontWeight: '500', fontSize: '18'}}>Nhận xét</Text>
        </View>
            <Divider width={1} orientation='vertical' />
        <ScrollView
            showsHorizontalScrollIndicator={false}
        >
            <View style={{marginBottom: 10}}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.story}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: '500', marginRight: 10}}>
                            username
                        </Text>
                        <Text style={{fontWeight: '300',color: 'gray'}}>
                            10 tháng
                        </Text>
                    </View>

                </View>
                
            </View>
        
        {/* //render comment here  */}
            <View style={{
                paddingLeft: 20,
                width: '90%'
            }}>
                <View style={styles.mediaImageContainer}>
                    <Image
                        source={{ uri: 'https://picsum.photos/200' }}
                        style={styles.image}
                        resizeMode="cover"
                    ></Image>
                </View>
                <Text style={{fontWeight: '500', fontSize: '16'}}>This is text comment</Text>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <AntDesign name="heart" size={18} color="black" />
                        </TouchableOpacity>
                        <Text>19</Text>
                        <TouchableOpacity style={{marginRight: 10, marginLeft: 10}}>
                            <Text>Trả lời</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="ellipsis1" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <AntDesign name="like1" size={18} color="black" />
                        </TouchableOpacity>
                        <Text style={{marginRight: 2, marginLeft: 2}}>Hữu ích</Text>
                        <Text>5</Text>
                    </View>
                </View>
            </View>
            </View>

            <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.story}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: '500', marginRight: 10}}>
                            username
                        </Text>
                        <Text style={{fontWeight: '300',color: 'gray'}}>
                            10 tháng
                        </Text>
                    </View>

                </View>
                
            </View>
        
        {/* //render comment here  */}
            <View style={{
                paddingLeft: 20,
                width: '90%'
            }}>
                <View style={styles.mediaImageContainer}>
                    <Image
                        source={{ uri: 'https://picsum.photos/200' }}
                        style={styles.image}
                        resizeMode="cover"
                    ></Image>
                </View>
                <Text style={{fontWeight: '500', fontSize: '16'}}>This is text comment</Text>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <AntDesign name="heart" size={18} color="black" />
                        </TouchableOpacity>
                        <Text>19</Text>
                        <TouchableOpacity style={{marginRight: 10, marginLeft: 10}}>
                            <Text>Trả lời</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="ellipsis1" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                            <AntDesign name="like1" size={18} color="black" />
                        </TouchableOpacity>
                        <Text style={{marginRight: 2, marginLeft: 2}}>Hữu ích</Text>
                        <Text>5</Text>
                    </View>
                </View>
            </View>
            </View>
        </ScrollView>
        
        <Divider width={1} orientation='vertical' />

        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.story}/>
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.btn}>
                        <Text>Thêm nhận xét</Text>
                    </TouchableOpacity>
                    </View>

                </View>
        </View>
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
        padding: 10,
        width: '90%'
    },
    mediaImageContainer: {
        width: 250,
        height: 250,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10,
        marginBottom: 10
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
    }
})
export default Detail;