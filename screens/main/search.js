import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { fileService } from "../../services/file.service";

const Search = () => {
  const [allFile, setAllFile] = useState([]);

  useEffect(() => {
    fileService.getAllFile().then((res) => {
      setAllFile(res);
    });
  }, []);

  const show = () => {
    let count = 0;
    for (var i of allFile) {
      if (i.tag.length > 0) {
        count++;
      }
    }
    console.log(
      "Tong cong " + count + "/" + allFile.length + " files duoc gan the"
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => show()}>
        <Text>Show tat ca anh duoc gan tag trong database</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
