import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  DimensionValue,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";
import { STUser } from "../types/STUser";
import { ExpoRouter } from "expo-router/types/expo-router";
import { TicketType } from "../types";

interface BankDetail {
  errorMessage: string | "";
  bankId: string | "";
  bankAccNo: string | "";
  bankAccHolderName: string | "";
  bankAccType: string | "";
  bankAccTypePos: string | "";
  bankNameAndBranch: string | "";
  branchAddress: string | "";
  bankIfsc: string | "";
  nomineeName: string | "";
  nomineeDob: string | "";
  checkPhoto: string | "";
  nomineeMobileNo: string | "";
  nomineeEmail: string | "";
  nomineeAdd: string | "";
  nomineeRelation: string | "";
  nomineeAccNo: string | "";
  bankDataPresent: string | "";
}

interface PointsSummary {
  pointsBalance: string | "";
  redeemedPoints: string | "";
  numberOfScan: string | "";
  tdsPoints: string | "";
  schemePoints: string | "";
  totalPointsRedeemed: string | "";
  totalPointsEarned: string | "";
}

interface KycDetails {
  kycFlag: string | "";
  userId: string | "";
  kycIdName: string | "";
  kycId: string | "";
  selfie: string | "";
  aadharOrVoterOrDLFront: string | "";
  aadharOrVoterOrDlBack: string | "";
  aadharOrVoterOrDlNo: string | "";
  panCardFront: string | "";
  panCardBack: string | "";
  panCardNo: string | "";
  gstFront: string | "";
  gstNo: string | "";
  gstYesNo: string | "";
}

interface WelcomeBanner {
  code: number | 0;
  textMessage: string | "";
  videoPath: string | "";
  imgPath: string | "";
  vdoText: string | "";
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface VguardRishtaUser {
  appVersionCode: string | "";
  retailerAppVersionCode: string | "";
  egvEnabled: string | "";
  otpType: string | "";
  welcomePointsMsg: string | "";
  welcomePointsErrorCode: number | 0;
  ecardPath: string | "";
  userId: string | "";
  password: string | "";
  inAllow: number | 0;
  userCode: string | "";
  emailId: string | "";
  enrolledOtherScheme: number | 0;
  enrolledOtherSchemeYesNo: string | "";
  maritalStatus: string | "";
  maritalStatusId: number | 0;
  distId: number | 0;
  cityId: number | 0;
  addDiff: number | 0;
  houseFlatNo: string | "";
  userProfession: number | 0;
  professionId: number | 0;
  subProfessionId: number | 0;
  profession: string | "";
  loginOtpUserName: string | "";
  mobileNo: string | "";
  otp: string | "";
  preferredLanguage: string | "";
  preferredLanguagePos: string | "";
  referralCode: string | "";
  nameOfReferee: string | "";
  name: string | "";
  gender: string | "";
  genderPos: string | "";
  dob: string | "";
  contactNo: string | "";
  whatsappNo: string | "";
  permanentAddress: string | "";
  streetAndLocality: string | "";
  landmark: string | "";
  city: string | "";
  dist: string | "";
  state: string | "";
  stateId: number | 0;
  pinCode: string | "";
  currentAddress: string | "";
  currStreetAndLocality: string | "";
  currLandmark: string | "";
  currCity: string | "";
  currCityId: number | 0;
  currDistId: number | 0;
  currDist: string | "";
  currState: string | "";
  currStateId: number | 0;
  currPinCode: string | "";
  otherCity: string | "";
  otherCurrCity: string | "";
  otherSchemeBrand: string | "";
  abtOtherSchemeLiked: string | "";
  otherSchemeBrand2: string | "";
  abtOtherSchemeLiked2: string | "";
  otherSchemeBrand3: string | "";
  abtOtherSchemeLiked3: string | "";
  otherSchemeBrand4: string | "";
  abtOtherSchemeLiked4: string | "";
  otherSchemeBrand5: string | "";
  abtOtherSchemeLiked5: string | "";
  annualBusinessPotential: number | 0;
  bankDetail: BankDetail;
  pointsSummary: PointsSummary;
  kycDetails: KycDetails;
  rejectedReasonsStr: string | "";
  roleId: string | "";
  gstNo: string | "";
  gstYesNo: string | "";
  gstPic: string | "";
  categoryDealInID: string | "";
  categoryDealIn: string | "";
  aspireGift: string | "";
  firmName: string | "";
  tierFlag: string | "";
  fcmToken: string | "";
  active: string | "";
  airCoolerEnabled: string | "";
  welcomeBanner: WelcomeBanner;
  updateAccount: string | "";
  islead: string | "";
  diffAcc: string | "";
}

export interface User {
  stUser: STUser;
  tokens: Tokens;
}

export interface State {
  stateId: number | 0;
  stateName: string | "";
}
export interface Cities {
  cityId: number | 0;
  cityName: string | "";
}
export interface District {
  distId: number | 0;
  districtName: string | "";
}

export interface NavigationProps {
  navigation: NavigationProp<ParamListBase>;
}

export interface PopupProps {
  isVisible: boolean;
  onClose?: () => void;
  children: string;
  acceptUpdate?: () => void;
}

export interface ActionPickerModalProps {
  onCamera: () => void;
  onGallery: () => void;
}

export interface AuthContextProps {
  isUserAuthenticated: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}
export interface AuthProviderProp {
  children: ReactNode;
}

export interface ButtonsProps {
  label?: string;
  style?: StyleProp<ImageStyle> | undefined;
  onPress?: () => void;
  disabled?: boolean;
  variant?: string;
  width?: DimensionValue;
  icon?: ImageSourcePropType;
  iconWidth?: DimensionValue;
  iconHeight?: DimensionValue;
  iconGap?: number;
  wrapperCustomStyle?: any;
}

export interface CustomTouchableOptionsProps {
  text: string;
  iconSource: ImageSourcePropType;
  screenName: unknown;
  disabled: boolean;
}

export interface DatePickerFieldProps {
  label: string;
  date: string;
  onDateChange: () => void;
}

export interface LoaderProps {
  isLoading: boolean;
}

export interface CustomerData {
  contactNo: string;
  name: string;
  email: string;
  currAdd: string;
  alternateNo: string;
  state: string;
  district: string;
  city: string;
  landmark: string;
  pinCode: string;
  dealerName: string;
  dealerAdd: string;
  dealerState: string;
  dealerDist: string;
  dealerCity: string;
  dealerPinCode: string;
  dealerNumber: string;
  addedBy: string;
  transactId: string;
  billDetails: string;
  warrantyPhoto: string;
  sellingPrice: string;
  emptStr: string;
  cresp: {
    custIdForProdInstall: string;
    modelForProdInstall: string;
    errorCode: string;
    errorMsg: string;
    statusType: string;
    balance: string;
    currentPoints: string;
    couponPoints: string;
    promotionPoints: string;
    transactId: string;
    schemePoints: string;
    basePoints: string;
    clubPoints: string;
    scanDate: string;
    scanStatus: string;
    copuonCode: string;
    bitEligibleScratchCard: string;
    pardId: string;
    partNumber: string;
    partName: string;
    couponCode: string;
    skuDetail: string;
    purchaseDate: string;
    categoryId: string;
    category: string;
    anomaly: string;
    warranty: string;
  };
  selectedProd: {
    specs: string;
    pointsFormat: string;
    product: string;
    productName: string;
    productCategory: string;
    productCode: string;
    points: string;
    imageUrl: string;
    userId: string;
    productId: string;
    paytmMobileNo: string;
  };
  latitude: string;
  longitude: string;
  geolocation: string;
  dealerCategory: string;
}

export interface ProfileCard {
  label: string;
  value: string | boolean;
}

export interface ProfileHeader {
  profile: STUser;
  router: ExpoRouter.Router;
}

export interface ProfileBank {
  profile: STUser;
  handlePress?: (label: string) => void;
  expandedItemId?: string | null;
}

export interface ImagePickerSectionInterface {
  profile: STUser;
  isImagePickerVisible: boolean;
  toggleModal: () => void;
}

export interface PopupSectionInterface {
  loader: boolean;
  popUp: boolean;
  cleanupPopUp: () => void;
  popupText: string;
  popUpIconType: string;
  popUpTitle: string;
}

export interface ProfileFields {
  fields: [object];
}

export interface SubmitButtonSectionInterface {
  onPress: () => void;
}

export interface ProductPickerSectionProps {
  items: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export interface DatePickerSectionProps {
  toDate?: Date;
  fromDate?: Date;
  startDate?: Date;
  showStart?: boolean;
  setShowStart: Dispatch<SetStateAction<boolean>>;
  onChangeStartDate: (selectedDate: Date) => void;
  showEnd?: boolean;
  setShowEnd: Dispatch<SetStateAction<boolean>>;
  onChangeEndDate: (selectedDate: Date) => void;
}

export interface PointsSectionProps {
  earnedPoints: string;
  redeemablePoints: string;
  tdsKitty: string;
}

export interface FieldSectionProps {
  t: any;
  isOptionsLoading: boolean;
  options: TicketType[];
  selectedOption: string;
  handleOptionChange: (value: string) => void;
  descriptionInput: string;
  setDescriptionInput: Dispatch<SetStateAction<string>>;
  isImagePickerVisible: boolean;
  toggleModal: () => void;
  openCamera: () => void;
  openGallery: () => void;
  selectedImage: string | null;
  handleImageModalToggle: () => void;
  isImageModalVisible: boolean;
}

export interface FooterSectionProps {
  t: any;
  openTnC: () => void;
  openFaqS: () => void;
}

export interface PopupContextProps {
  popUp: boolean;
  setPopUp: Dispatch<SetStateAction<boolean>>;
  popUpButtonCount: number;
  setPopUpButtonCount: Dispatch<SetStateAction<number>>;
  popUpTitle: string;
  setPopUpTitle: Dispatch<SetStateAction<string>>;
  popupText: string;
  setPopupText: Dispatch<SetStateAction<string>>;
  popUpIconType: string;
  setPopUpIconType: Dispatch<SetStateAction<string>>;
  popUpButton2Text: string;
  setPopupButton2Text: Dispatch<SetStateAction<string>>;
  cleanupPopUp: () => void;
}
