import React from "react";
import { View, Image, Button, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

// `setSelectedImage` を受け取るようにする
interface ImagePickerProps {
  selectedImage: string | null;
  setSelectedImage: (uri: string | null) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ selectedImage, setSelectedImage }) => {
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          Alert.alert("キャンセルしました");
        } else if (response.errorMessage) {
          Alert.alert("エラー", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          if (response.assets[0].uri) {
            setSelectedImage(response.assets[0].uri);
          } else {
            Alert.alert("エラー", "画像のURIが見つかりませんでした");
          }
        }
      }
    );
  };

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 250, height: 360, borderRadius: 10, marginBottom: 10 }}
        />
      ) : (
        <View
          style={{
            width: 250,
            height: 350,
            backgroundColor: "#ddd",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Button title="画像を選択" onPress={pickImage} color={"#68A98A"} />
        </View>
      )}
      {selectedImage && <Button title="画像を変更" onPress={pickImage} color={"#68A98A"} />}
    </View>
  );
};

export default ImagePicker;
