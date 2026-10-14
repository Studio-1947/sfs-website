import type { Language } from "./data";

export interface Cue {
  start: number; // seconds
  end: number;
  text: Record<Language, string>;
}

// Timed from the actual audio of /videos/lesson-demo.mp4 (WHO-style hand-washing demo).
// Bengali / Hindi / Nepali lines are translations of the English captions.
export const subtitleCues: Cue[] = [
  {
    start: 0, end: 6,
    text: {
      EN: "Wash hands when visibly soiled. Otherwise, use hand rub.",
      BN: "হাত স্পষ্টভাবে নোংরা হলে সাবান দিয়ে ধুয়ে নিন। অন্যথায় হ্যান্ড রাব ব্যবহার করুন।",
      HI: "हाथ साफ़ तौर पर गंदे दिखें तो उन्हें धोएँ। अन्यथा हैंड रब का उपयोग करें।",
      NE: "हात स्पष्ट रूपमा फोहोर देखिए धुनुहोस्। अन्यथा ह्यान्ड रब प्रयोग गर्नुहोस्।",
    },
  },
  {
    start: 9, end: 11,
    text: {
      EN: "Wet hands with water.",
      BN: "হাত পানিতে ভিজিয়ে নিন।",
      HI: "हाथों को पानी से गीला करें।",
      NE: "हात पानीले भिजाउनुहोस्।",
    },
  },
  {
    start: 12, end: 15,
    text: {
      EN: "Apply enough soap to cover all hand surfaces.",
      BN: "হাতের সব অংশ ঢাকার মতো যথেষ্ট সাবান লাগান।",
      HI: "हाथों की सभी सतहों को ढकने के लिए पर्याप्त साबुन लगाएँ।",
      NE: "हातका सबै भागमा लाग्ने गरी पर्याप्त साबुन लगाउनुहोस्।",
    },
  },
  {
    start: 16, end: 18,
    text: {
      EN: "Rub hands palm to palm.",
      BN: "এক হাতের তালু অন্য হাতের তালুতে ঘষুন।",
      HI: "हथेली से हथेली रगड़ें।",
      NE: "हत्केला हत्केलामा रगड्नुहोस्।",
    },
  },
  {
    start: 19, end: 23,
    text: {
      EN: "Right palm over left back of hand with fingers interlaced, and vice versa.",
      BN: "ডান হাতের তালু বাঁ হাতের পিঠের ওপর রেখে আঙুলের ফাঁকে আঙুল ঢুকিয়ে ঘষুন, তারপর উল্টোভাবে করুন।",
      HI: "दाहिनी हथेली को बाएँ हाथ के पिछले हिस्से पर रखकर उँगलियाँ आपस में फँसाकर रगड़ें, फिर यही दूसरे हाथ से करें।",
      NE: "दायाँ हत्केला बायाँ हातको पछाडिको भागमा राखी औँलाहरू एकअर्कामा जोडेर रगड्नुहोस्, अनि उल्टो गर्नुहोस्।",
    },
  },
  {
    start: 24, end: 27,
    text: {
      EN: "Palm to palm with fingers interlaced.",
      BN: "আঙুলের ফাঁকে আঙুল ঢুকিয়ে তালুতে তালু ঘষুন।",
      HI: "उँगलियाँ आपस में फँसाकर हथेली से हथेली रगड़ें।",
      NE: "औँलाहरू एकअर्कामा जोडेर हत्केला हत्केलामा रगड्नुहोस्।",
    },
  },
  {
    start: 28, end: 32,
    text: {
      EN: "Backs of fingers to opposing palms with fingers interlocked.",
      BN: "আঙুল মুঠো করে আঙুলের পিঠ বিপরীত হাতের তালুতে ঘষুন।",
      HI: "उँगलियों के पिछले हिस्से को विपरीत हथेली पर रखकर, उँगलियाँ फँसाकर रगड़ें।",
      NE: "औँलाको पछाडिको भाग अर्को हत्केलामा राखी औँलाहरू जोडेर रगड्नुहोस्।",
    },
  },
  {
    start: 33, end: 37,
    text: {
      EN: "Rotational rubbing of left thumb clasped in right palm, and vice versa.",
      BN: "বাঁ হাতের বুড়ো আঙুল ডান হাতের তালুতে চেপে ধরে গোল করে ঘষুন, তারপর উল্টোভাবে করুন।",
      HI: "बाएँ अँगूठे को दाहिनी हथेली में बंद करके गोलाकार रगड़ें, फिर यही दूसरे हाथ से करें।",
      NE: "बायाँ बुढी औँलालाई दायाँ हत्केलाले समातेर गोलो आकारमा रगड्नुहोस्, अनि उल्टो गर्नुहोस्।",
    },
  },
  {
    start: 39, end: 46,
    text: {
      EN: "Rotational rubbing, backwards and forwards, with clasped fingers of right hand in left palm, and vice versa.",
      BN: "ডান হাতের আঙুলগুলো জড়ো করে বাঁ হাতের তালুতে সামনে-পেছনে গোল করে ঘষুন, তারপর উল্টোভাবে করুন।",
      HI: "दाहिने हाथ की बंद उँगलियों को बाईं हथेली में आगे-पीछे गोलाकार रगड़ें, फिर यही दूसरे हाथ से करें।",
      NE: "दायाँ हातका जोडिएका औँलाहरू बायाँ हत्केलामा अगाडि-पछाडि गोलो आकारमा रगड्नुहोस्, अनि उल्टो गर्नुहोस्।",
    },
  },
  {
    start: 48, end: 50,
    text: {
      EN: "Rinse hands with water.",
      BN: "হাত পানি দিয়ে ধুয়ে ফেলুন।",
      HI: "हाथों को पानी से धो लें।",
      NE: "हात पानीले पखाल्नुहोस्।",
    },
  },
  {
    start: 52, end: 56,
    text: {
      EN: "Dry hands thoroughly with a single-use paper towel.",
      BN: "একবার-ব্যবহারযোগ্য টিস্যু পেপার দিয়ে হাত ভালোভাবে মুছুন।",
      HI: "एक बार इस्तेमाल होने वाले टिश्यू पेपर से हाथ अच्छी तरह सुखाएँ।",
      NE: "एकपटक प्रयोग गरिने टिस्यु पेपरले हात राम्ररी सुकाउनुहोस्।",
    },
  },
  {
    start: 58, end: 60,
    text: {
      EN: "Use your elbow to close the tap.",
      BN: "কনুই দিয়ে কল বন্ধ করুন।",
      HI: "नल बंद करने के लिए कोहनी का उपयोग करें।",
      NE: "धारा बन्द गर्न कुहिनो प्रयोग गर्नुहोस्।",
    },
  },
  {
    start: 61, end: 64,
    text: {
      EN: "Your hands are now safe.",
      BN: "আপনার হাত এখন নিরাপদ।",
      HI: "आपके हाथ अब सुरक्षित हैं।",
      NE: "तपाईंको हात अब सुरक्षित छ।",
    },
  },
];

export function formatClock(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function vttTime(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = (sec % 60).toFixed(3).padStart(6, "0");
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${s}`;
}

export function buildVtt(lang: Language): string {
  const body = subtitleCues
    .map((c, i) => `${i + 1}\n${vttTime(c.start)} --> ${vttTime(c.end)}\n${c.text[lang]}`)
    .join("\n\n");
  return `WEBVTT\n\n${body}\n`;
}
