("https://www.christunite.com/index.php/chinese-bible/chinesepinyinbible");

let OT = document.querySelectorAll(
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > table > tbody > tr > td > a"
);
let NT = document.querySelectorAll(
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > a"
);
let extraNT = document.querySelectorAll(
  "#s5_component_wrap_inner > div.item-page > div > div > table > tbody > tr > td > p > a"
);
// let array = [];
// forEach(book=> array.push(book.href))

const NTLinks = [
  "https://www.christunite.com/pinyin_bible/Mat_1.htm",
  "https://www.christunite.com/pinyin_bible/Heb_1.htm",
  "https://www.christunite.com/pinyin_bible/Mak_1.htm",
  "https://www.christunite.com/pinyin_bible/Jas_1.htm",
  "https://www.christunite.com/pinyin_bible/Luk_1.htm",
  "https://www.christunite.com/pinyin_bible/1Pe_1.htm",
  "https://www.christunite.com/pinyin_bible/Jhn_1.htm",
  "https://www.christunite.com/pinyin_bible/2Pe_1.htm",
  "https://www.christunite.com/pinyin_bible/Act_1.htm",
  "https://www.christunite.com/pinyin_bible/1Jn_1.htm",
  "https://www.christunite.com/pinyin_bible/2Jn_1.htm",
  "https://www.christunite.com/pinyin_bible/Rom_1.htm",
  "https://www.christunite.com/pinyin_bible/3Jn_1.htm",
  "https://www.christunite.com/pinyin_bible/1Co_1.htm",
  "https://www.christunite.com/pinyin_bible/Jud_1.htm",
  "https://www.christunite.com/pinyin_bible/2Co_1.htm",
  "https://www.christunite.com/pinyin_bible/Gal_1.htm",
  "https://www.christunite.com/pinyin_bible/Rev_1.htm",
  "https://www.christunite.com/pinyin_bible/Eph_1.htm",
  "https://www.christunite.com/pinyin_bible/Phl_1.htm",
  "https://www.christunite.com/pinyin_bible/Col_1.htm",
  "https://www.christunite.com/pinyin_bible/1Ti_1.htm",
  "https://www.christunite.com/pinyin_bible/2Ti_1.htm",
  "https://www.christunite.com/pinyin_bible/Tit_1.htm",
  "https://www.christunite.com/pinyin_bible/1Ts_1.htm",
  "https://www.christunite.com/pinyin_bible/2Ts_1.htm",
  "https://www.christunite.com/pinyin_bible/Phm_1.htm",
];

const OTLinks = [
  "https://www.christunite.com/pinyin_bible/Gen_1.htm",
  "https://www.christunite.com/pinyin_bible/Job_1.htm",
  "https://www.christunite.com/pinyin_bible/Exo_1.htm",
  "https://www.christunite.com/pinyin_bible/Psm_1.htm",
  "https://www.christunite.com/pinyin_bible/Lev_1.htm",
  "https://www.christunite.com/pinyin_bible/Pro_1.htm",
  "https://www.christunite.com/pinyin_bible/Num_1.htm",
  "https://www.christunite.com/pinyin_bible/Ecc_1.htm",
  "https://www.christunite.com/pinyin_bible/Deu_1.htm",
  "https://www.christunite.com/pinyin_bible/Son_1.htm",
  "https://www.christunite.com/pinyin_bible/Jos_1.htm",
  "https://www.christunite.com/pinyin_bible/Isa_1.htm",
  "https://www.christunite.com/pinyin_bible/Jug_1.htm",
  "https://www.christunite.com/pinyin_bible/Jer_1.htm",
  "https://www.christunite.com/pinyin_bible/Rut_1.htm",
  "https://www.christunite.com/pinyin_bible/Lam_1.htm",
  "https://www.christunite.com/pinyin_bible/1Sa_1.htm",
  "https://www.christunite.com/pinyin_bible/Eze_1.htm",
  "https://www.christunite.com/pinyin_bible/2Sa_1.htm",
  "https://www.christunite.com/pinyin_bible/Dan_1.htm",
  "https://www.christunite.com/pinyin_bible/1Ki_1.htm",
  "https://www.christunite.com/pinyin_bible/Hos_1.htm",
  "https://www.christunite.com/pinyin_bible/2Ki_1.htm",
  "https://www.christunite.com/pinyin_bible/Joe_1.htm",
  "https://www.christunite.com/pinyin_bible/1Ch_1.htm",
  "https://www.christunite.com/pinyin_bible/Amo_1.htm",
  "https://www.christunite.com/pinyin_bible/2Ch_1.htm",
  "https://www.christunite.com/pinyin_bible/Oba_1.htm",
  "https://www.christunite.com/pinyin_bible/Ezr_1.htm",
  "https://www.christunite.com/pinyin_bible/Jon_1.htm",
  "https://www.christunite.com/pinyin_bible/Neh_1.htm",
  "https://www.christunite.com/pinyin_bible/Mic_1.htm",
  "https://www.christunite.com/pinyin_bible/Est_1.htm",
  "https://www.christunite.com/pinyin_bible/Nah_1.htm",
  "https://www.christunite.com/pinyin_bible/Hab_1.htm",
  "https://www.christunite.com/pinyin_bible/Zep_1.htm",
  "https://www.christunite.com/pinyin_bible/Hag_1.htm",
  "https://www.christunite.com/pinyin_bible/Zec_1.htm",
  "https://www.christunite.com/pinyin_bible/Mal_1.htm",
];
