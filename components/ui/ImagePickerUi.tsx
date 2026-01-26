import { uploadFile } from '@/api/files';
import useColor from '@/hooks/useColor';
import { renderURLFile } from '@/lib/file';
import { toastError } from '@/lib/toast';
import Feather from '@expo/vector-icons/Feather';
import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import ActivityIndicatorUi from './ActivityIndicatorUi';
import ImageUi from './ImageUi';
import TouchableOpacityUi from './TouchableOpacityUi';

interface ImagePickerUiProps {
    value?: string;
    onChange?: (path?: string) => void
}

export default function ImagePickerUi(props: ImagePickerUiProps) {
    const { value, onChange } = props

    const color = useColor()

    const [imagePath, setImagePath] = useState<string | undefined>(value);

    useEffect(() => {
        setImagePath(value)
    }, [value])

    const upfileFileMutation = useMutation({
        mutationFn: uploadFile,
        onSuccess: (res) => {
            setImagePath(res);
            onChange?.(res)
        },
        onError: (err) => {
            toastError(err.message)
            console.log("ERR upfileFileMutation", err)
        }
    })

    const pickImages = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Yêu cầu quyền truy cập', 'Cần quyền truy cập thư viện ảnh.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            allowsMultipleSelection: false,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            const file = {
                uri: asset.uri,
                name: asset.fileName ?? 'photo.jpg',
                type: asset.mimeType,
            }
            upfileFileMutation.mutate(file as unknown as File)
        }
    };

    const removeImage = () => {
        setImagePath(undefined);
        onChange?.(undefined)
    };

    if (upfileFileMutation.isPending) {
        return (
            <View
                style={[
                    styles.addBtn,
                    {
                        borderColor: color.borderColor,
                    }
                ]}
            >
                <ActivityIndicatorUi />
            </View>
        )
    }

    return imagePath ?
        <View style={styles.container}>
            <ImageUi
                source={{
                    uri: renderURLFile(imagePath)
                }}
                style={styles.image}
            />

            <TouchableOpacity
                style={styles.removeBtn}
                onPress={removeImage}
            >
                <Feather name="x" size={16} color="#fff" />
            </TouchableOpacity>
        </View> :
        <TouchableOpacityUi
            onPress={pickImages}
            style={[
                styles.addBtn,
                {
                    borderColor: color.borderColor
                }
            ]}
        >
            <Feather name="plus" size={40} color={color.borderColor} />
        </TouchableOpacityUi>
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: 112,
        height: 112,
    },
    addBtn: {
        width: 112,
        height: 112,
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 112,
        height: 112,
        borderRadius: 8,
    },
    removeBtn: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'rgba(255,0,0)',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});