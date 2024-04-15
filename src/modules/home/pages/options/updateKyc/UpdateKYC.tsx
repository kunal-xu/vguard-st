import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, PermissionsAndroid, Modal, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../../../../../colors'
import { Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-paper';
import Buttons from '../../../../../components/Buttons';
import arrowIcon from '../../../../../assets/images/arrow.png';
import NeedHelp from '../../../../../components/NeedHelp';
import { width, height } from '../../../../../utils/dimensions';
import ImageWithModal from '../../../../../components/ImageWithModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import Loader from '../../../../../components/Loader';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { sendFile, reUpdateUserForKyc, getRishtaUserProfile } from '../../../../../utils/apiservice';
import Icon from 'react-native-vector-icons/FontAwesome';
import Popup from '../../../../../components/Popup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionPickerModal from '../../../../../components/ActionPickerModal';
import { getImages } from '../../../../../utils/FileUtils';

const UpdateKYC = ({ navigation }) => {
    const { t } = useTranslation();
    const [select, setselect] = useState();
    const [IdProofFrontData, setIdProofFrontData] = useState(null);
    const [IdProofBackData, setIdProofBackData] = useState(null);
    const [PanData, setPanData] = useState(null);
    const [SelfieData, setSelfieData] = useState(null);

    const [pancardno, setpancardno] = useState();
    const [aadharcardno, setaadharcardno] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [kycflag, setkycflag] = useState('');
    const [kycId, setkycId] = useState('');
    const [userId, setuserId] = useState('');
    const [kycidname, setkycidname] = useState('');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [aadharbackuuid, setaadharbackuuid] = useState(null);
    const [aadharfrontuuid, setaadharfrontuuid] = useState(null);
    const [pancarduuid, setpancarduuid] = useState(null);
    const [selfieuuid, setselfieuuid] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [IsModalVisible1, setIsModalVisible1] = useState(false);
    const [selfieemodal, setselfieemodal] = useState(false);
    const [panmodal, setpanmodal] = useState(false);
    const [isAadharValid, setIsAadharValid] = useState(true);
    const [isPanValid, setIsPanValid] = useState(true);
    const [aadharbackuuidnew, setaadharbackuuidnew] = useState(null);
    const [aadharfrontuuidnew, setaadharfrontuuidnew] = useState(null);
    const [pancarduuidnew, setpancarduuidnew] = useState(null);
    const [selfieuuidnew, setselfieuuidnew] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [showModal,setShowModal] = useState({isVisible:false,documentType:null,onCapture:null})

    let options = {
        saveToPhotoes: true,
        mediaType: 'photo',
        saveToPhotos: true,
        selectionLimit: 1,
        quality: 0.5,
        includeBase64: true,
        storageOption: {
            skipbackup: true,
            path: 'images',
        }
    };
    const openCamera = async (documentType, onCapture) => {
        setShowModal(false)
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        const granted1 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        const granted2 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options);
            const photo = result.assets[0];
            const newPhoto = { uri: photo.uri, type: photo.type, name: photo.fileName }

            switch (documentType) {

                case 'IdProofFront':
                    setIdProofFrontData(newPhoto.uri);
                    break;
                case 'IdProofBack':
                    setIdProofBackData(newPhoto.uri);
                    break;
                case 'Pan':
                    setPanData(newPhoto.uri);
                    break;
                case 'Selfie':
                    setSelfieData(newPhoto.uri);
                    break;
                default:
                    console.log('Unknown document type');
            }

            // Call the provided callback function to further process the data
            if (typeof onCapture === 'function') {
                onCapture(documentType, newPhoto);
            }
        }
    };

    const openImagePicker = async (documentType, onCapture) => {
        setShowModal(false)
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        const granted1 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        const granted2 = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const options = {
                mediaType: 'photo',
                quality: 0.5,
                cameraType: 'back',
                saveToPhotos: true,
            };

            const result = await launchImageLibrary(options);

            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.log('ImagePicker Error: ', result.error);
            } else {
                const photo = result.assets[0];
                const newPhoto = { uri: photo.uri, type: photo.type, name: photo.fileName }
                console.log(newPhoto, 'SSSSSS')
                // Handle the captured data based on the document type
                switch (documentType) {

                    case 'IdProofFront':
                        setIdProofFrontData(newPhoto.uri);
                        break;
                    case 'IdProofBack':
                        setIdProofBackData(newPhoto.uri);
                        break;
                    case 'Pan':
                        setPanData(newPhoto.uri);
                        break;
                    case 'Selfie':
                        setSelfieData(newPhoto.uri);
                        break;
                    default:
                        console.log('Unknown document type');
                }

                // Call the provided callback function to further process the data
                if (typeof onCapture === 'function') {
                    onCapture(documentType, newPhoto);
                }
            }
        }
    };

    const validateAadhar = (aadhar) => {
        // Use a regular expression to check if the Aadhar card number is valid.
        const aadharPattern = /^\d{12}$/;
        return aadharPattern.test(aadhar);
    };

    const handleAadharBlur = () => {
        const isValid = validateAadhar(aadharcardno);
        setIsAadharValid(isValid);
    };
    const validatePan = (pan) => {
        // Use a regular expression to check if the PAN card number is valid.
        const panPattern = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
        return panPattern.test(pan);
    };
    const handlePanBlur = () => {
        const upperCasePan = pancardno.toUpperCase(); // Convert to uppercase
        const isValid = validatePan(upperCasePan);
        setIsPanValid(isValid);
        setpancardno(upperCasePan); // Update the state with uppercase value
    };

    async function Fetchingprofile() {
        try {
            setIsLoading(true);
            const response = await getRishtaUserProfile();
          
            setselfieuuid(response.data.kycDetails.selfie);
            setaadharfrontuuid(response.data.kycDetails.aadharOrVoterOrDLFront);
            setaadharbackuuid(response.data.kycDetails.aadharOrVoterOrDlBack);
            setpancarduuid(response.data.kycDetails.panCardFront);
            setpancardno(response.data.kycDetails.panCardNo);
            setaadharcardno(response.data.kycDetails.aadharOrVoterOrDlNo);
            await fetchAndSetImageData(response.data.kycDetails.selfie, 'PROFILE', 1);
            await fetchAndSetImageData(response.data.kycDetails.aadharOrVoterOrDLFront, 'ID_CARD_FRONT', 1);
            await fetchAndSetImageData(response.data.kycDetails.aadharOrVoterOrDlBack, 'ID_CARD_BACK', 1);
            await fetchAndSetImageData(response.data.kycDetails.panCardFront, 'PAN_CARD_FRONT', 1);
            




        } catch (error) {
            console.log("Error:", error);
        } finally {
            setIsLoading(false)
        }
    }

    const uploadFiles = async (fileDataArray) => {

       

        try {
            const responses = [];
            for (const fileData of fileDataArray) {
                const { imageRelated, file } = fileData;
                console.log("inside api uplode files", file);

                if (file) { // Check if the file is not null
                    const formData = new FormData();


                    formData.append('file', {
                        uri: file,
                        type: 'image/' + file.split('/').pop().split('.').pop(),
                        name: file.split('/').pop().split('.').pop(),

                    });
                    formData.append('imageRelated', imageRelated);
                    formData.append('userRole', "1");

                 

                    const response = await sendFile(formData);
                    
                    responses.push(response.data);
                }
            }

            return responses;
        } catch (error) {


            console.error('Error sending files:', error);
            throw error;
        }
    };


    const triggerApiWithImageupdatekyc = async () => {
        try {
            setIsLoading(true);
            const filesToUpload = [
                { imageRelated: 'ID_CARD_FRONT', file: IdProofFrontData },
                { imageRelated: 'ID_CARD_BACK', file: IdProofBackData },
                { imageRelated: 'PAN_CARD_FRONT', file: PanData },
                { imageRelated: 'PROFILE', file: SelfieData },

            ];

            // Filter out files with null data
            const validFilesToUpload = filesToUpload.filter(fileData => fileData.file !== null);

            if (validFilesToUpload.length >= 0) {
                const responses = await uploadFiles(validFilesToUpload);

                // Extract and store entityUid values in separate state variables
                responses.forEach((response, index) => {
                    switch (validFilesToUpload[index].imageRelated) {
                        case 'ID_CARD_FRONT':
                            setaadharfrontuuidnew(response.entityUid);
                            //  console.log("WHERE THE FILE IS SETTING UP", aadharfrontuuid);
                            break;
                        case 'ID_CARD_BACK':
                            setaadharbackuuidnew(response.entityUid);
                            break;
                        case 'PAN_CARD_FRONT':
                            setpancarduuidnew(response.entityUid);
                            break;
                        case 'PROFILE':
                            setselfieuuidnew(response.entityUid);
                            break;
                        default:
                            break;
                    }

                });
               


                if (aadharfrontuuidnew != null && aadharfrontuuidnew != 'undefined' && aadharbackuuidnew != null && aadharbackuuidnew != 'undefined' && selfieuuidnew != 'undefined' && selfieuuidnew != null) {
                 
                    handleKycUpdate();
                }
                else {

                }
            } else {
                console.log('No valid files to upload.');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKycUpdate = async () => {
        setIsLoading(true)
        try {
 

            const kycData = {
                kycFlag: kycflag,
                userId: userId,
                kycIdName: kycidname,
                kycId: kycId,
                selfie: selfieuuidnew,
                aadharOrVoterOrDLFront: aadharfrontuuidnew,
                aadharOrVoterOrDlBack: aadharbackuuidnew,
                aadharOrVoterOrDlNo: aadharcardno,
                panCardFront: pancarduuidnew,
                panCardNo: pancardno,
                panCardBack: "",
                gstFront: '',
                gstNo: "",
                gstYesNo: "",

            };
            const response = await reUpdateUserForKyc(kycData);
            setIsPopupVisible(true);
            setPopupMessage(response.message);

            if (response.message == 'Your KYC re-submission successful') {
                setTimeout(() => {
                    navigation.navigate('home');
                }, 2500);
            }
        } catch (error) {
            console.error('KYC Update Error:', error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        const getUserRoleFromAsyncStorage = async () => {
            const userRole = await AsyncStorage.getItem('userRole');
            setUserRole(userRole);
        };
        getUserRoleFromAsyncStorage();
        Fetchingprofile();
    }, [])

    const fetchAndSetImageData = async (uuid, imageRelated, userRole) => {
        try {
            // setIsLoading(true)
            const imageUrl =  getImages(uuid, imageRelated);
            
            switch (imageRelated) {
                case 'ID_CARD_FRONT':
                    console.log(imageUrl)
                    setIdProofFrontData(imageUrl);
                    break;
                case 'ID_CARD_BACK':
                    console.log(imageUrl)
                    setIdProofBackData(imageUrl);
                    //console.log("INSDE THE ID PROOF BACK IMAGE ", IdProofBackData);
                    break;
                case 'PAN_CARD_FRONT':
                    console.log(imageUrl)
                    setPanData(imageUrl);
                    break;
                case 'PROFILE':
                    setSelfieData(imageUrl);
                    break;

                default:
                    console.warn(`Unhandled imageRelated value: ${imageRelated}`);
            }

            console.log(`Data set for ${imageRelated} (${uuid}):`, imageUrl);
            return null;
        } catch (error) {
            console.error(`Error getting file for ${imageRelated} (${uuid}):`, error);
            throw error;
        } finally {
            // setIsLoading(false);
        }
    };


    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.mainWrapper}>
                    {showModal.isVisible&&
                    <ActionPickerModal onCamera={()=>openCamera(showModal.documentType,showModal.onCapture)} onGallery={()=>openImagePicker(showModal.documentType,showModal.onCapture)}/>}
                    {/* <View style={styles.header}>
                    <Text style={styles.textHeader}>{t('dashboard:updateKYC:header')}</Text>
                </View> */}
                    {/* <View style={styles.form}> */}
                    {isLoading == true ? <View style={{ flex: 1 }}>

                        <Loader isLoading={isLoading} />
                    </View> : null}
                    {isPopupVisible && (<Popup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)}>
                        <Text>{popupMessage}</Text>

                    </Popup>
                    )}
                    <View style={styles.pickercontainer}>
                        <View
                            style={styles.picker}
                        >

                            {SelfieData === null ?
                                <TouchableOpacity onPress={() => setShowModal({isVisible:true,documentType:'Selfie'})}>
                                    <><Text style={{ color: 'black' }}>Update your selfie*</Text></>
                                </TouchableOpacity> :
                                <TouchableOpacity mode="text" onPress={() => setShowModal({isVisible:true,documentType:'Selfie'})} color={'grey'}>
                                    <Text style={{ color: 'black', margin: 10, height: height / 25 }}> Update your selfie*</Text>
                                </TouchableOpacity>
                            }

                           

                        </View>

                        <ImageWithModal imageUri={SelfieData} style={styles.noimage} />
                    </View>

                    <View style={styles.pickercontainer}>
                        <View
                            style={styles.picker}
                        >
                            {IdProofFrontData === null ?
                                <TouchableOpacity onPress={() =>  setShowModal({isVisible:true,documentType:'IdProofFront'})}>
                                    <><Text style={{ color: 'black' }}>Aadhar Card (Front)*</Text></>
                                </TouchableOpacity> :
                                <TouchableOpacity mode="text" onPress={() =>  setShowModal({isVisible:true,documentType:'IdProofFront'})} color={'grey'}>
                                    <Text style={{ color: 'black', margin: 10, height: height / 25 }}>Aadhar Card (Front)</Text>
                                </TouchableOpacity>
                            }



                        </View>

                        <ImageWithModal imageUri={IdProofFrontData} style={styles.noimage} />

                    </View>

                    <View style={styles.pickercontainer}>
                        <View
                            style={styles.picker}
                        >
                            {IdProofBackData === null ?
                                <TouchableOpacity onPress={() =>  setShowModal({isVisible:true,documentType:'IdProofBack'})}>
                                    <><Text style={{ color: 'black' }}>Aadhar Card (Back)*</Text></>
                                </TouchableOpacity> :
                                <TouchableOpacity mode="text" onPress={() =>  setShowModal({isVisible:true,documentType:'IdProofBack'})} color={'grey'}>
                                    <Text style={{ color: 'black', margin: 10, height: height / 25 }}>Aadhar Card (Back)</Text>
                                </TouchableOpacity>
                            }
                            
                        </View>
                        <ImageWithModal imageUri={IdProofBackData} style={styles.noimage} />
                    </View>
                    <View style={styles.pickercontainer}>
                        <View
                            style={styles.picker}
                        >
                            <View>

                                <FloatingLabelInput
                                    label={t('strings:update_aadhar_voter_id_dl_manually')}
                                    value={aadharcardno}
                                    onChangeText={(text) => setaadharcardno(text)}
                                    keyboardType='number-pad'
                                    containerStyles={[styles.input]}
                                    staticLabel
                                    // labelStyles={styles.labelStyles}
                                    inputStyles={{
                                        color: isAadharValid ? colors.black : 'red',
                                        // paddingHorizontal: 20,
                                        marginVertical: 10,
                                        height: height / 23
                                    }}
                                    onBlur={handleAadharBlur}

                                    maxLength={12}
                                />
                                {!isAadharValid && (
                                    <Text style={{ color: 'red', marginTop: 5 }}>{t('strings:please_enter_valid_aadhar_no')}</Text>
                                )}
                            </View>


                        </View>
                        <Icon name="keyboard-o" size={25} color="grey" style={{ margin: 10, left: 5 }} />

                    </View>

                    <View style={styles.pickercontainer}>
                        <View
                            style={styles.picker}
                        >
                            {PanData === null ?
                                <TouchableOpacity onPress={() =>  setShowModal({isVisible:true,documentType:'Pan'})}>
                                    <><Text style={{ color: 'black' }}>Update Your pan Card(FRONT)</Text></>
                                </TouchableOpacity> :
                                <TouchableOpacity mode="text" onPress={() =>  setShowModal({isVisible:true,documentType:'Pan'})} color={'grey'}>
                                    <Text style={{ margin: 10, color: "black", height: height / 25 }}>Update Pan Card(FRONT)</Text>
                                </TouchableOpacity>
                            }
                            
                        </View>
                        <ImageWithModal imageUri={PanData} style={styles.noimage} />
                    </View>
                    <View style={styles.pickercontainer}>
                        <View
                            style={styles.picker}
                        >
                            <View>
                                <FloatingLabelInput
                                    label="Update Pan Number manually"
                                    value={pancardno}
                                    onChangeText={(text) => setpancardno(text)}
                                    keyboardType='default'
                                    containerStyles={[styles.input]}
                                    staticLabel
                                    // labelStyles={styles.labelStyles}
                                    inputStyles={{
                                        color: isAadharValid ? colors.black : 'red',
                                        // paddingHorizontal: 20,
                                        marginVertical: 10,
                                        height: height / 23
                                    }}
                                    onBlur={handleAadharBlur}

                                    maxLength={12}
                                />
                                {!isPanValid && (
                                    <Text style={{ color: 'red', marginTop: 5 }}>{t('strings:please_enter_valid_pan_no')}</Text>
                                )}
                            </View>
                        </View>
                        <Icon name="keyboard-o" size={25} color="grey" style={{ margin: 10, left: 5 }} />
                    </View>
                    <Buttons
                        style={styles.button}
                        label={'Submit'}
                        variant="filled"
                        onPress={() => triggerApiWithImageupdatekyc()}
                        width="100%"
                        iconHeight={10}
                        iconWidth={30}
                        iconGap={30}
                        icon={arrowIcon}
                    />
                    {/* </View> */}
                    <NeedHelp />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: colors.white
    },
    mainWrapper: {
        padding: 15
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginTop: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    textHeader: {
        fontSize: 10,
        color: colors.black,
        fontWeight: 'bold'
    },
    textSubHeader: {
        fontSize: 10,
        color: colors.black,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 20,

    },
    button: {
        backgroundColor: colors.black,
        paddingVertical: 10,
        borderRadius: 5
    },
    buttonText: {
        color: colors.white,
        width: '100%',
        textAlign: 'center',
    },
    picker: {
        backgroundColor: colors.white,
        height: 40,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'column',
        marginTop: 0,
        width: width / 1.75,
        marginTop: 5,
        paddingBottom: 5,
        flex: 1
    },
    pickercontainer: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 2,
        borderColor: colors.grey,
        borderRadius: 10,
        height: 60,
        justifycontent: 'Space-between',
        marginBottom: 20,
        alignItems: 'center',
        paddingRight: 10
    },
    noimage: {
        backgroundColor: colors.lightGrey,
        borderRadius: 5,
    },
    modalcontainer: {
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    imagePickerModal: {
        width: width / 1.80, 
        alignSelf: 'center', 
        height: height / 8, 
        top: height / 2.8,
        margin: 20,
        backgroundColor: colors.lightGrey,
        borderRadius: 20,
        padding: 10,
        elevation: 5,
    }
})
export default UpdateKYC