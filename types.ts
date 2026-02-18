
export enum Gender {
  MALE = 'Nam',
  FEMALE = 'Nữ'
}

export enum CalendarType {
  SOLAR = 'Dương Lịch',
  LUNAR = 'Âm Lịch'
}

export interface UserInfo {
  fullName: string;
  birthDate: string;
  birthTime: string;
  gender: Gender;
  calendarType: CalendarType;
}

export interface Star {
  name: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  type: 'Main' | 'Minor' | 'Lucky' | 'Unlucky';
  significance: string;
}

export interface Palace {
  id: string;
  name: string;
  position: number; // 0-11 for Tý, Sửu, Dần...
  mainStars: Star[];
  minorStars: Star[];
  majorFortune: string;
  minorFortune: string;
  location: string; // Tý, Sửu...
}

export interface HoroscopeData {
  userInfo: UserInfo;
  palaces: Palace[];
  destinyElement: string;
  yinYang: string;
  animalSign: string;
  summary: string;
}
