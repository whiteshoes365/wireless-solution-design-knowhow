/**
 * NFC 탭 콘텐츠 — 13.56 MHz 자기결합, 표준 지도(ISO·NFC Forum), 상세 장표, 코일·매칭, 시험·인증
 * content.js 다음에 로드. window.KB_CONTENT.tabs 에 NFC 탭 추가.
 *
 * ※ 규제·인증 요구는 지역·버전별로 다르고 개정된다. 수치는 규격 대표값 — 최신 원문 확인.
 */
(function () {
  if (!window.KB_CONTENT || !window.KB_CONTENT.tabs) return;

  window.KB_CONTENT.tabs.push({
    id: "nfc",
    label: "NFC",
    icon: "🟣",
    chapters: [
      /* ───────────── N0. 개요 ───────────── */
      {
        id: "nfc-intro",
        icon: "📘",
        title: "N0. NFC 개요",
        sections: [
          {
            id: "nfc-overview",
            title: "NFC는 '전파'가 아니라 '변압기'다 — 원리·표준 지도·동작 모드",
            blocks: [
              { t: "p", html: "NFC(Near Field Communication)는 13.56 MHz에서 <b>리더 코일과 태그 코일이 자기장으로 결합</b>해 전력과 데이터를 주고받는 기술입니다. Wi-Fi·BLE처럼 전파를 멀리 보내는 것이 아니라, 변압기의 1차·2차 코일처럼 가까이 있을 때만 맞물립니다. 그래서 거리는 수 cm에 그치지만, 그 짧은 거리 자체가 <b>'갖다 대는 행위 = 의도'</b>라는 보안·사용성 이점이 됩니다." },
              { t: "note", kind: "info", title: "비유로 먼저", html: "<b>전동칫솔 충전기</b>를 떠올리세요. 충전 거치대(리더)의 코일이 만든 자기장이 칫솔(태그) 속 코일에 전류를 유도해 배터리 없이도 전력을 받습니다. NFC는 여기에 '대화'를 얹은 것입니다. 리더는 자기장 세기를 순간순간 줄여(ASK) 명령을 보내고, 태그는 자기 쪽 부하를 켰다 껐다 해서(부하 변조) 리더 코일에 걸리는 전류를 미세하게 흔드는 방식으로 대답합니다. <b>태그는 스스로 전파를 내지 않습니다.</b>" },
              { t: "fig",
                caption: "NFC의 동작. 리더 코일의 교류 전류가 만든 자기장이 태그 코일을 관통해 전력을 공급하고(변압기 결합), 리더는 자기장 진폭을 변조해 명령을 보낸다. 태그는 자기 부하를 바꿔 리더가 보는 임피던스를 흔들어 응답한다(부하 변조). 공간으로 방사되는 에너지는 거의 없다.",
                svg: '<svg viewBox="0 0 620 245" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NFC 리더와 태그 코일의 자기 결합과 부하 변조">'
                  + '<defs>'
                  + '<marker id="nfA" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto"><path d="M0,0 L5.5,3 L0,6 Z" fill="#4aa3ff"/></marker>'
                  + '<marker id="nfB" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto"><path d="M0,0 L5.5,3 L0,6 Z" fill="#2ea043"/></marker>'
                  + '</defs>'
                  + '<rect x="30" y="70" width="90" height="80" rx="8" fill="#4aa3ff" fill-opacity="0.14" stroke="#4aa3ff" stroke-opacity="0.7"/>'
                  + '<text x="75" y="104" text-anchor="middle" class="fig-label" style="fill:#4aa3ff">리더</text><text x="75" y="124" text-anchor="middle" class="fig-sub">(폰·가전)</text>'
                  + '<rect x="500" y="70" width="90" height="80" rx="8" fill="#a371f7" fill-opacity="0.14" stroke="#a371f7" stroke-opacity="0.7"/>'
                  + '<text x="545" y="104" text-anchor="middle" class="fig-label" style="fill:#a371f7">태그</text><text x="545" y="124" text-anchor="middle" class="fig-sub">(배터리 없음)</text>'
                  + (function(){
                      var o='';
                      [0,1,2,3].forEach(function(i){o+='<ellipse cx="'+(200+i*6)+'" cy="110" rx="10" ry="'+(34-i*2)+'" fill="none" stroke="#4aa3ff" stroke-width="2.5"/>';});
                      [0,1,2,3].forEach(function(i){o+='<ellipse cx="'+(402+i*6)+'" cy="110" rx="10" ry="'+(30-i*2)+'" fill="none" stroke="#a371f7" stroke-width="2.5"/>';});
                      o+='<line x1="120" y1="110" x2="190" y2="110" stroke="#4aa3ff" stroke-width="2"/><line x1="430" y1="110" x2="500" y2="110" stroke="#a371f7" stroke-width="2"/>';
                      [0,1,2].forEach(function(i){var ry=22+i*14;o+='<ellipse class="kb-pulse kb-d'+(i*2+1)+'" cx="310" cy="110" rx="'+(96+i*8)+'" ry="'+ry+'" fill="none" stroke="#e3b341" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.8"/>';});
                      return o;
                    })()
                  + '<text x="310" y="40" text-anchor="middle" class="fig-sub" fill="#e3b341">공유 자기장 (13.56 MHz, 수 cm)</text>'
                  + '<line class="kb-flow" x1="150" y1="188" x2="470" y2="188" stroke="#4aa3ff" stroke-width="2.5" marker-end="url(#nfA)"/>'
                  + '<text x="310" y="180" text-anchor="middle" class="fig-sub" fill="#4aa3ff">전력 + 명령 (필드 진폭 변조, ASK)</text>'
                  + '<line class="kb-flow-rev" x1="470" y1="212" x2="150" y2="212" stroke="#2ea043" stroke-width="2.5" marker-end="url(#nfB)"/>'
                  + '<text x="310" y="234" text-anchor="middle" class="fig-sub" fill="#2ea043">응답 (태그가 부하를 바꿔 리더 전류를 흔듦 — 부하 변조)</text>'
                  + '</svg>'
              },
              { t: "h", text: "표준 지도 — ISO와 NFC Forum의 관계" },
              { t: "kv", rows: [
                ["ISO/IEC 14443 A·B", "근접형 카드(Proximity) — 교통카드·사원증·전자여권 등. NFC-A, NFC-B의 기반"],
                ["JIS X 6319-4 (FeliCa)", "일본 교통·결제 카드 방식. NFC-F의 기반"],
                ["ISO/IEC 15693", "원격형 카드(Vicinity) — 더 먼 거리, 느린 속도. 도서·물류·산업 태그. NFC-V의 기반"],
                ["ISO/IEC 18092 (NFCIP-1)", "위 방식들을 아우르는 NFC 통신 표준 — 기기 간 통신(P2P) 포함"],
                ["NFC Forum", "기기 간 상호운용을 위한 업계 규격 — 기술(NFC-A/B/F/V), 태그 타입(Type 2~5), 데이터 형식(NDEF), 아날로그(RF) 요구, 인증 프로그램"],
                ["EMVCo", "비접촉 결제 단말·카드의 규격과 인증 — 결제 기능이 있을 때만 해당"],
              ]},
              { t: "h", text: "세 가지 동작 모드" },
              { t: "table",
                head: ["모드", "누가 필드를 만드나", "예", "가전 관련성"],
                rows: [
                  ["리더/라이터", "내 기기", "폰이 태그를 읽음, 가전이 카드를 읽음", "가전에 리더 IC를 넣는 경우 (사용자 인식 등)"],
                  ["카드 에뮬레이션", "상대(리더)", "폰을 교통카드·사원증처럼 사용 (HCE·보안칩)", "드묾"],
                  ["P2P (NFC-DEP)", "번갈아", "기기끼리 직접 데이터 교환", "사실상 쇠퇴 — 스마트폰의 P2P 공유 기능이 대부분 종료"],
                ]
              },
              { t: "note", kind: "tip", title: "가전에서 NFC를 쓰는 방식 — 대부분 '수동 태그'", html: "가전 NFC의 주류는 리더가 아니라 <b>가전 쪽에 태그를 두고 스마트폰이 읽는</b> 구조입니다. ①<b>탭 연결</b>: 폰을 대면 앱 실행·기기 등록(Wi-Fi/BLE 커미셔닝 정보 전달). Matter도 셋업 정보(QR 코드와 같은 내용)를 NFC 태그로 전달하는 방식을 규격에 포함합니다. ②<b>커넥티드 태그</b>: NFC와 I²C를 함께 가진 태그 IC를 가전 MCU에 연결 — 폰이 대면 가전 상태·진단 로그를 읽고 설정을 써 넣습니다. ③<b>전원이 꺼져 있어도</b> 폰의 자기장으로 태그가 동작하므로, 고장 진단·초기 설정을 전원 없이 할 수 있습니다. 상세 비교는 <a href='#nfc-spec-sheet'>N1 상세 장표</a>를 보세요." },
              { t: "note", kind: "info", title: "연결", html: "설계 탭의 <a href='#proto-nfc'>NFC 코일 설계 요약</a>, 근거리장 개념은 <a href='#ant-fields'>근거리장·원거리장</a>, 공진은 <a href='#rf-resonance'>공진의 이해</a>와 이어집니다." },
            ]
          }
        ]
      },

      /* ───────────── N1. 표준 상세 장표 ───────────── */
      {
        id: "nfc-spec",
        icon: "📋",
        title: "N1. 표준 상세 장표 — 기술·태그 타입·결합·코일·시험",
        sections: [
          {
            id: "nfc-spec-sheet",
            title: "NFC-A / B / F / V 상세 장표",
            blocks: [
              { t: "p", html: "NFC Forum의 네 가지 기술(NFC-A/B/F/V)은 같은 13.56 MHz 반송파를 쓰지만 <b>리더→카드 변조 깊이, 부호화, 카드→리더 응답 방식, 속도, 거리</b>가 모두 다릅니다. 폰은 네 방식을 차례로 시도(폴링)해 상대를 찾습니다. 아래 장표는 네 기술을 한 표에 놓은 것입니다." },
              { t: "fig",
                caption: "반송파 진폭으로 본 세 가지 신호. NFC-A 리더는 반송파를 아주 짧게 끄는(100% ASK) 방식으로 명령하고, NFC-B 리더는 진폭을 약 10%만 낮춘다(10% ASK — 태그 전력 공급이 끊기지 않음). 카드의 응답은 리더 코일에 보이는 진폭의 미세한 변화(부하 변조)로, 847.5 kHz 부반송파에 실려 리더가 반송파와 구분해 꺼낸다.",
                svg: '<svg viewBox="0 0 620 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NFC-A 100% ASK, NFC-B 10% ASK, 부하 변조 파형 비교">'
                  + (function(){
                      var o='';
                      function row(y,label,col,segs,sub){
                        o+='<text x="20" y="'+(y-26)+'" class="fig-label" style="fill:'+col+'">'+label+'</text>';
                        o+='<text x="600" y="'+(y-26)+'" text-anchor="end" class="fig-sub">'+sub+'</text>';
                        var x=20;var top='M'+x+','+y;var bot='M'+x+','+(y+0);
                        segs.forEach(function(s){top+=' L'+x+','+(y-s[1])+' L'+(x+s[0])+','+(y-s[1]);x+=s[0];});
                        o+='<path class="kb-flow-slow" d="'+top+'" stroke="'+col+'" stroke-width="2" fill="none"/>';
                        var x2=20;var lo='M'+x2+','+y;
                        segs.forEach(function(s){lo+=' L'+x2+','+(y+s[1])+' L'+(x2+s[0])+','+(y+s[1]);x2+=s[0];});
                        o+='<path d="'+lo+'" stroke="'+col+'" stroke-width="2" fill="none" opacity="0.6"/>';
                        o+='<line x1="20" y1="'+y+'" x2="600" y2="'+y+'" stroke="#7a8694" stroke-opacity="0.3"/>';
                      }
                      row(52,'NFC-A 명령 — 100% ASK','#4aa3ff',[[90,16],[12,0],[120,16],[12,0],[60,16],[12,0],[150,16],[12,0],[112,16]],'짧은 멈춤 = 태그 전력도 잠깐 끊김');
                      row(126,'NFC-B 명령 — 10% ASK','#e3b341',[[90,16],[40,14],[80,16],[40,14],[60,16],[40,14],[110,16],[40,14],[80,16]],'진폭 약 10%만 낮춤');
                      var segs=[];for(var i=0;i<29;i++){segs.push([20,(i%2===0)?16:15]);}
                      row(200,'카드 응답 — 부하 변조','#2ea043',segs,'진폭 미세 변화 (847.5 kHz 부반송파)');
                      return o;
                    })()
                  + '</svg>'
              },
              { t: "table",
                head: ["항목", "NFC-A", "NFC-B", "NFC-F", "NFC-V"],
                rows: [
                  ["기반 표준", "ISO/IEC 14443 A", "ISO/IEC 14443 B", "JIS X 6319-4 (FeliCa)", "ISO/IEC 15693"],
                  ["반송파", "13.56 MHz ± 7 kHz", "13.56 MHz ± 7 kHz", "13.56 MHz ± 7 kHz", "13.56 MHz ± 7 kHz"],
                  ["리더→카드 변조", "<b>100% ASK</b> (짧은 멈춤)", "<b>10% ASK</b> (변조 지수 8~14%)", "ASK 약 10% (8~30%)", "10% 또는 100% ASK"],
                  ["리더→카드 부호화", "Modified Miller", "NRZ-L", "Manchester", "펄스 위치 (1-of-4 / 1-of-256)"],
                  ["카드→리더", "부하 변조 · 부반송파 847.5 kHz · Manchester(OOK)", "부하 변조 · 부반송파 847.5 kHz · BPSK · NRZ-L", "부하 변조 · 부반송파 없음 · Manchester", "부하 변조 · 부반송파 423.75 kHz (이중: 423.75 / 484.28 kHz) · Manchester"],
                  ["기본 속도", "106 kbps (= 13.56 MHz ÷ 128)", "106 kbps", "212 / 424 kbps", "26.48 kbps (= ÷ 512) · 저속 명령 1.65 kbps"],
                  ["고속 옵션", "212 · 424 · 848 kbps (ISO-DEP)", "212 · 424 · 848 kbps", "—", "—"],
                  ["리더 필드 세기 (규격)", "1.5 ~ 7.5 A/m (rms)", "1.5 ~ 7.5 A/m (rms)", "NFC Forum 아날로그 규격 기준", "0.15 ~ 5 A/m (rms)"],
                  ["동작 거리", "NFC Forum 기준 0 ~ 4 cm", "0 ~ 4 cm", "0 ~ 4 cm", "폰으로는 수 cm · 전용 리더+큰 안테나면 수십 cm"],
                  ["충돌 방지 (여러 장 동시)", "UID 비트 단위 판별", "타임슬롯", "타임슬롯", "타임슬롯 (16 슬롯)"],
                  ["NFC Forum 태그 타입", "Type 2 · Type 4", "Type 4", "Type 3", "Type 5"],
                  ["대표 제품", "NTAG · MIFARE 계열, 다수 교통·출입 카드", "일부 신분증·전자여권", "FeliCa (일본 교통·결제)", "ICODE · ST25 계열, 도서·물류·산업"],
                  ["가전에서", "<b>가장 흔함</b> — 탭 연결 태그", "드묾", "일본 시장 결제 연동 시", "커넥티드 태그 · 판독 거리가 필요할 때"],
                ]
              },
              { t: "p", html: "<b>표 기준</b>: 속도·부반송파는 모두 반송파 13.56 MHz를 정수로 나눈 값입니다(106 kbps = ÷128, 847.5 kHz = ÷16, 423.75 kHz = ÷32). 필드 세기는 ISO/IEC 14443·15693이 리더에 요구하는 범위이고, 동작 거리는 NFC Forum 아날로그 규격의 동작 볼륨 기준입니다. 결제(EMVCo)는 별도의 더 엄격한 요구가 있습니다." },
              { t: "note", kind: "why", title: "왜 NFC-A는 100%, NFC-B는 10% ASK인가", html: "태그는 리더의 자기장에서 전력을 받으므로, 리더가 명령을 보내려고 필드를 완전히 끄면(100% ASK) 그 순간 태그 전력도 끊깁니다. NFC-A는 멈춤을 <b>약 2~3 µs로 아주 짧게</b> 만들고 태그 쪽 커패시터가 버티게 해서 해결했고, 대신 부호화(Modified Miller)로 멈춤 횟수를 줄였습니다. NFC-B는 아예 <b>진폭을 10%만 낮춰</b> 전력이 끊기지 않게 하는 대신, 태그가 작은 진폭 변화를 정확히 검출해야 합니다. 같은 문제(전력과 데이터를 한 자기장에 싣기)에 대한 두 가지 답입니다." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"NFC는 106 kbps라 느려서 데이터 전송엔 못 쓴다?\"", html: "NFC의 목적은 대용량 전송이 아니라 <b>짧은 거리에서 의도를 확인하고 작은 정보를 주고받는 것</b>입니다. 기기 등록 정보, URL, 진단 요약 같은 수백 바이트~수 KB는 106 kbps로 1초도 걸리지 않습니다. 큰 데이터가 필요하면 NFC로 Wi-Fi·BLE 연결 정보를 넘기고 실제 전송은 그쪽으로 하는 <b>'NFC 핸드오버'</b>가 표준 방식입니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 기술 선택", html: "가전에 태그를 붙인다면 <b>NFC-A 기반 Type 2(단순 정보·링크) 또는 Type 4(보안 인증)</b>가 iOS·Android 모두에서 가장 무난합니다. 판독 거리나 커넥티드 태그 기능이 중요하면 NFC-V(Type 5) 계열도 후보입니다. 어느 쪽이든 <b>iOS와 Android 대표 폰 여러 대로 실제 판독 위치·거리를 시험</b>하세요. 폰마다 NFC 안테나 위치와 세기가 크게 다릅니다." },
            ]
          },
          {
            id: "nfc-tag-types",
            title: "NFC Forum 태그 타입 1~5와 NDEF",
            blocks: [
              { t: "p", html: "NFC Forum은 태그를 다섯 가지 타입으로 정의하고, 어느 타입이든 같은 데이터 형식인 <b>NDEF(NFC Data Exchange Format)</b>로 URL·텍스트·연결 정보를 담게 했습니다. 폰은 타입을 몰라도 NDEF만 읽으면 되므로, 태그 선택은 <b>메모리·보안·거리·가격</b>으로 결정됩니다." },
              { t: "table",
                head: ["타입", "기술", "대표 칩 계열", "메모리 (대략)", "속도", "특징", "가전 활용"],
                rows: [
                  ["Type 1", "NFC-A", "Topaz", "96 B ~ 2 KB", "106 kbps", "가장 오래된 타입 — 신규 설계 비권장", "—"],
                  ["<b>Type 2</b>", "NFC-A", "NTAG 21x · MIFARE Ultralight", "수십 B ~ 약 2 KB", "106 kbps", "<b>저가·가장 흔함</b>, 비밀번호 보호 정도", "제품 정보·앱 연결 링크·등록 정보"],
                  ["Type 3", "NFC-F", "FeliCa Lite-S", "수백 B ~ 수 KB", "212 / 424 kbps", "일본 생태계", "일본 시장 연동"],
                  ["<b>Type 4</b>", "NFC-A / B (ISO-DEP)", "NTAG 4xx DNA · DESFire", "수 KB ~ 수십 KB", "106 ~ 848 kbps", "APDU 명령·파일 구조, <b>암호 인증·위조 방지 메시지</b>", "정품 인증·보안 커미셔닝"],
                  ["<b>Type 5</b>", "NFC-V", "ICODE · ST25 계열", "수백 B ~ 수십 KB", "26.48 kbps", "거리 유리, <b>NFC+I²C 커넥티드 태그</b> 제품 다수", "진단 로그·전원 꺼진 상태 판독·설정 쓰기"],
                ]
              },
              { t: "kv", rows: [
                ["NDEF 메시지", "레코드 여러 개의 묶음. 각 레코드 = 형식(TNF) + 타입 + 페이로드"],
                ["대표 레코드", "URI(웹·앱 링크), 텍스트, 스마트 포스터, Android 앱 레코드(AAR), <b>Wi-Fi·BLE 연결 정보(핸드오버)</b>"],
                ["커넥티드 태그", "NFC 쪽은 폰이 읽고, I²C 쪽은 가전 MCU가 읽고 씀 — 둘이 같은 메모리를 공유. 폰 필드로 에너지를 받아 외부 회로에 공급하는 기능(에너지 하베스팅)을 가진 제품도 있음"],
              ]},
              { t: "note", kind: "warn", title: "흔한 오해 — \"NFC는 근접이라 그 자체로 보안이 된다?\"", html: "거리가 짧아 몰래 읽기가 어렵다는 것은 보조 장치일 뿐입니다. 적절한 장비와 큰 안테나를 쓰면 규격 거리보다 멀리서도 통신을 엿듣거나 중계(relay)할 수 있다는 연구가 있습니다. Type 2 태그의 내용은 <b>누구나 읽고 복제</b>할 수 있습니다. 정품 인증·보안 커미셔닝에는 암호 인증이 있는 Type 4 계열을 쓰고, 민감한 정보(비밀번호 등)를 평문 NDEF에 넣지 마세요." },
              { t: "note", kind: "tip", title: "현장 노하우 — 태그 선정 체크", html: "①iOS·Android 모두 백그라운드 판독이 되는지(NDEF 형식, URL 레코드 위치) ②필요한 메모리와 쓰기 보호·비밀번호 ③커넥티드 태그라면 I²C 전압·인터럽트 핀·에너지 하베스팅 출력 ④<b>금속 위 부착</b>이면 페라이트 시트 일체형 태그나 안테나 재설계 필요(→ <a href='#nfc-antenna'>코일·매칭</a>)." },
            ]
          },
          {
            id: "nfc-coupling",
            title: "결합의 물리 — 왜 수 cm인가, 거리를 늘리려면",
            blocks: [
              { t: "p", html: "13.56 MHz의 파장은 <b>약 22 m</b>이고, 근거리장 경계 λ/2π는 <b>약 3.5 m</b>입니다. NFC가 동작하는 수 cm는 그 경계보다 100배 안쪽인 <b>리액티브 근거리장</b> 깊숙한 곳이라, 에너지는 거의 방사되지 않고 코일 주변에 저장된 자기장으로만 오갑니다(→ <a href='#ant-fields'>근거리장·원거리장</a>). NFC '안테나'가 사실은 안테나가 아니라 <b>변압기의 한쪽 코일</b>인 이유입니다." },
              { t: "fig",
                caption: "거리에 따른 자기장 세기(로그-로그, 개념도). 근거리장에서 코일의 자기장은 거리의 세제곱에 반비례해(1/r³) 거리 10배에 60 dB씩 급감하고, 전파로 떠나는 원거리장 성분은 1/r로 완만하게 줄어든다. NFC는 왼쪽 끝 수 cm 구간만 쓴다 — 거리가 2배가 되면 자기장은 1/8(−18 dB)이 된다.",
                svg: '<svg viewBox="0 0 620 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="자기장 세기의 거리 의존성 근거리 1/r3 원거리 1/r">'
                  + '<line x1="70" y1="190" x2="590" y2="190" stroke="#7a8694" stroke-width="1.5"/><line x1="70" y1="190" x2="70" y2="24" stroke="#7a8694" stroke-width="1.5"/>'
                  + '<text x="62" y="34" text-anchor="end" class="fig-sub">H</text><text x="586" y="208" text-anchor="end" class="fig-sub">거리 (로그)</text>'
                  + '<rect x="70" y="24" width="90" height="166" fill="#a371f7" fill-opacity="0.08"/>'
                  + '<text x="115" y="104" text-anchor="middle" class="fig-sub" fill="#a371f7">NFC 구간</text><text x="115" y="120" text-anchor="middle" class="fig-sub" fill="#a371f7">0 ~ 수 cm</text>'
                  + '<path class="kb-flow-slow" d="M80,40 L430,176" stroke="#4aa3ff" stroke-width="3" fill="none"/>'
                  + '<text x="250" y="96" class="fig-sub" fill="#4aa3ff">근거리 자기장 ∝ 1/r³ (60 dB/decade)</text>'
                  + '<path d="M80,150 L590,170" stroke="#2ea043" stroke-width="2" stroke-dasharray="6 4" fill="none"/>'
                  + '<text x="470" y="158" text-anchor="middle" class="fig-sub" fill="#2ea043">방사 성분 ∝ 1/r</text>'
                  + '<line x1="430" y1="24" x2="430" y2="190" stroke="#e5534b" stroke-dasharray="4 4" opacity="0.7"/>'
                  + '<text x="436" y="38" class="fig-sub" fill="#e5534b">λ/2π ≈ 3.5 m</text>'
                  + '<text x="80" y="208" class="fig-sub">1 cm</text><text x="160" y="208" class="fig-sub">10 cm</text><text x="300" y="208" class="fig-sub">1 m</text>'
                  + '</svg>'
              },
              { t: "kv", rows: [
                ["결합 세기", "상호 인덕턴스 M = k·√(L₁·L₂). k(결합 계수)는 두 코일의 크기·거리·정렬로 정해지며 NFC에서는 대략 0.01 ~ 0.3 수준"],
                ["코일 축 위 자기장", "H = N·I·a² / (2·(a² + z²)^(3/2)) — a: 코일 반지름, z: 거리, N: 턴 수, I: 전류"],
                ["최적 코일 크기", "위 식을 a로 미분하면 <b>a = √2·z</b>에서 거리 z의 자기장이 최대. 4 cm를 노리면 반지름 약 5.7 cm가 이상적 — 작은 코일은 가까이서 강하고 멀리서 급격히 약함"],
                ["거리 2배의 의미", "근거리장(z ≫ a)에서 H ∝ 1/z³ → 자기장 1/8 (−18 dB). 태그가 받는 전력은 더 가파르게 줄어듦"],
              ]},
              { t: "note", kind: "warn", title: "흔한 오해 — \"출력을 키우면 거리가 쭉 늘어난다?\"", html: "1/r³ 감쇠 때문에 리더 전류를 2배로 올려도 거리는 약 2^(1/3) ≈ 1.26배밖에 늘지 않습니다. 그 대가로 소비 전류·발열·규제 마진이 나빠지고, 가까이 있는 태그엔 과도한 필드가 걸립니다(규격 상한 7.5 A/m). 거리를 늘리는 데는 출력보다 <b>코일 크기(a = √2·z), 정렬, 주변 금속 제거, 정확한 공진 튜닝</b>이 훨씬 효과적입니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 결합이 바뀌면 공진도 바뀐다", html: "두 코일이 가까워지면 서로의 인덕턴스에 영향을 줘 공진 주파수가 이동합니다(디튜닝). 그래서 리더 쪽은 <b>카드가 없을 때와 바짝 붙었을 때 모두</b> 동작하도록 Q와 매칭을 잡아야 하고, 폰이 가전 태그에 아주 가까이 닿았을 때 오히려 인식이 불안정한 경우가 있습니다. 판독 시험은 '최대 거리'뿐 아니라 <b>밀착 상태</b>와 <b>비스듬한 각도</b>도 포함하세요." },
            ]
          },
          {
            id: "nfc-antenna",
            title: "코일 안테나·공진·Q·매칭 회로 — NFC HW 설계의 핵심",
            blocks: [
              { t: "p", html: "NFC HW 설계는 결국 <b>코일(L)을 13.56 MHz에 공진시키고, 그 Q를 데이터가 통과할 만큼 낮추고, 리더 IC의 출력 임피던스에 맞추는 일</b>입니다. 50Ω 전송선과 스미스 차트 대신 공진 주파수·Q·매칭 커패시터가 언어입니다." },
              { t: "fig",
                caption: "리더 IC의 일반적인 안테나 회로(차동). 송신 출력은 ①EMC 필터(L0·C0, 고조파 차단)를 지나 ②매칭 커패시터(직렬 C1·병렬 C2)와 ③댐핑 저항(R, Q 조절)을 거쳐 ④코일 안테나를 13.56 MHz에 공진시킨다. 수신은 코일 전압을 분압해 RX 핀으로 되돌려 부하 변조를 검출한다.",
                svg: '<svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NFC 리더 안테나 매칭 회로 블록">'
                  + '<defs><marker id="nfM" markerWidth="8" markerHeight="8" refX="5.5" refY="3" orient="auto"><path d="M0,0 L5.5,3 L0,6 Z" fill="#7a8694"/></marker></defs>'
                  + (function(){
                      var b=[['리더 IC','TX1 / TX2',30,'#4aa3ff'],['① EMC 필터','L0 · C0',150,'#e3b341'],['② 매칭','C1 직렬 · C2 병렬',270,'#2ea043'],['③ 댐핑','R (Q 조절)',390,'#a371f7']];
                      var o='';
                      b.forEach(function(r,i){
                        o+='<rect class="kb-pulse kb-d'+(i*2+1)+'" x="'+r[2]+'" y="60" width="100" height="62" rx="8" fill="'+r[3]+'" fill-opacity="0.14" stroke="'+r[3]+'" stroke-opacity="0.7"/>';
                        o+='<text x="'+(r[2]+50)+'" y="86" text-anchor="middle" class="fig-label" style="fill:'+r[3]+'">'+r[0]+'</text>';
                        o+='<text x="'+(r[2]+50)+'" y="106" text-anchor="middle" class="fig-sub">'+r[1]+'</text>';
                        if(i<3) o+='<line class="kb-flow" x1="'+(r[2]+102)+'" y1="91" x2="'+(r[2]+118)+'" y2="91" stroke="#7a8694" stroke-width="2" marker-end="url(#nfM)"/>';
                      });
                      o+='<line class="kb-flow" x1="492" y1="91" x2="508" y2="91" stroke="#7a8694" stroke-width="2" marker-end="url(#nfM)"/>';
                      for(var i=0;i<4;i++){o+='<rect x="'+(514+i*6)+'" y="'+(66+i*4)+'" width="'+(76-i*12)+'" height="'+(50-i*8)+'" rx="6" fill="none" stroke="#e5534b" stroke-width="2"/>';}
                      o+='<text x="552" y="140" text-anchor="middle" class="fig-sub" fill="#e5534b">④ 코일 L</text>';
                      o+='<path d="M552,150 V178 H80 V128" stroke="#7a8694" stroke-width="1.5" stroke-dasharray="5 4" fill="none" marker-end="url(#nfM)"/>';
                      o+='<text x="316" y="172" text-anchor="middle" class="fig-sub">수신 경로: 코일 전압 분압 → RX 핀 (부하 변조 검출)</text>';
                      o+='<text x="310" y="40" text-anchor="middle" class="fig-sub">f₀ = 1 / (2π√(L·C)) = 13.56 MHz · Q = f₀ ÷ 대역폭</text>';
                      o+='<text x="310" y="208" text-anchor="middle" class="fig-sub">값은 칩사 계산 도구로 시작해 VNA로 실측하며 맞춘다</text>';
                      return o;
                    })()
                  + '</svg>'
              },
              { t: "table",
                head: ["코일 인덕턴스 L", "13.56 MHz 공진에 필요한 총 커패시턴스", "비고"],
                rows: [
                  ["0.5 µH", "약 276 pF", "턴 수 적은 작은 코일"],
                  ["1.0 µH", "약 138 pF", ""],
                  ["1.5 µH", "약 92 pF", "리더 안테나로 흔한 범위"],
                  ["2.0 µH", "약 69 pF", "턴 수 많은 코일 — 기생 커패시턴스 비중↑"],
                ]
              },
              { t: "p", html: "<b>표 기준</b>: C = 1 / ((2π · 13.56 MHz)² · L)로 계산한 이상값입니다. 실제로는 코일 자체의 기생 커패시턴스(턴 사이), 배선, 칩 핀 커패시턴스가 더해지므로 매칭 커패시터 값은 이보다 작아집니다. 코일 인덕턴스는 계산 도구로 시작해 <b>임피던스 분석기나 VNA로 실측</b>해 확정합니다." },
              { t: "note", kind: "why", title: "Q — 높으면 멀리, 낮으면 정확히", html: "Q = f₀ ÷ 대역폭입니다. Q가 높으면 같은 전류로 더 강한 자기장을 만들어 거리가 늘지만, 대역폭이 좁아져(Q 20이면 약 680 kHz, Q 30이면 약 450 kHz) 데이터의 빠른 변화가 뭉개집니다. 106 kbps의 응답은 ±847.5 kHz 떨어진 부반송파에 실리므로, Q가 너무 높으면 그 성분이 약해지고 리더 명령의 멈춤(100% ASK) 끝에서 진동이 오래 남아 태그가 오판합니다. 그래서 <b>댐핑 저항으로 Q를 일부러 낮추며</b>, 적정값은 칩사 가이드(흔히 수십 이하, 속도가 높을수록 낮게)와 실측으로 정합니다(→ <a href='#rf-resonance'>공진과 Q</a>)." },
              { t: "note", kind: "warn", title: "흔한 오해 — \"금속 근처여도 튜닝만 다시 하면 된다?\"", html: "금속판은 코일의 자기장을 받아 <b>와전류</b>를 만들고, 그 와전류가 반대 방향 자기장을 내서 코일 인덕턴스를 떨어뜨리고 에너지를 열로 빼앗습니다. 공진 주파수가 이동할 뿐 아니라 Q와 결합 자체가 나빠지므로 재튜닝만으로는 회복되지 않습니다. 금속 가전 외장 근처라면 코일과 금속 사이에 <b>페라이트 시트</b>(투자율 높은 자성 시트)를 넣어 자기장이 금속에 닿기 전에 우회시키고, 그 상태에서 튜닝해야 합니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 설계·튜닝 순서", html: "①<b>최종 위치(외장·금속·페라이트 포함)</b>에서 코일 인덕턴스와 자체 공진을 측정 ②칩사 계산 도구로 EMC 필터(L0·C0)와 매칭(C1·C2), 댐핑 R 초기값 계산 ③VNA로 공진 주파수와 임피던스를 실측하며 C를 조정 ④카드·폰을 붙인 상태의 디튜닝도 확인 ⑤필드 세기와 판독 거리를 실기로 확인. 조립 공차로 인덕턴스가 흔들리므로 <b>커패시터 자리를 병렬 두 개로 나눠</b> 미세 조정할 여유를 남겨 두면 양산 대응이 쉽습니다(→ <a href='#rf-smith'>매칭 자리 확보 원칙</a>)." },
            ]
          },
          {
            id: "nfc-test",
            title: "측정 항목·시험·규제 — 무엇을 재고 어디서 인증받나",
            blocks: [
              { t: "p", html: "NFC는 전파 출력이 아니라 <b>자기장 세기와 변조 파형</b>을 잽니다. 그래서 측정 도구도 스펙트럼 분석기보다 <b>기준 안테나(픽업 코일)·오실로스코프·VNA</b>가 중심입니다." },
              { t: "table",
                head: ["측정 항목", "무엇을 보나", "도구", "관련 HW"],
                rows: [
                  ["공진 주파수 · Q", "코일+매칭이 13.56 MHz에 맞는지, Q가 적정한지", "VNA · 임피던스 분석기", "매칭 C · 댐핑 R · 금속/페라이트"],
                  ["필드 세기", "동작 볼륨 안에서 최소·최대 필드(예: 14443은 1.5~7.5 A/m)", "규격 기준 안테나(교정된 픽업 코일)", "코일 크기 · 구동 전류"],
                  ["리더 변조 파형", "ASK 깊이, 멈춤 시간, 상승·하강 시간, 오버슈트", "오실로스코프 + 픽업 코일", "Q · 댐핑 (높은 Q는 링잉)"],
                  ["부하 변조 진폭", "태그 응답이 리더에 충분히 크게 보이는지", "기준 리더 · 규격 시험 장비", "태그 코일 · 결합 · 태그 IC"],
                  ["판독 거리 · 위치", "실제 폰 여러 대의 인식 거리와 위치 분포", "대표 iOS·Android 단말 · 지그", "코일 위치 · 외장 재질"],
                  ["EMC · 규제", "13.56 MHz 대역 자기장·전계 한도, 고조파", "EMC 시험소", "EMC 필터 · 접지"],
                ]
              },
              { t: "kv", rows: [
                ["시험 방법 표준", "ISO/IEC 10373-6 (14443 카드·리더 시험 방법), ISO/IEC 10373-7 (15693)"],
                ["NFC Forum 인증", "NFC Forum 규격(아날로그·디지털·태그 타입) 적합성 — 기기 간 상호운용 보증"],
                ["EMVCo", "결제 기능이 있을 때만 — 결제 단말 레벨 1(아날로그·프로토콜) 인증"],
                ["전파 규제", "미국 FCC Part 15.225 (13.553~13.567 MHz), 유럽 EN 300 330, 한국 무선설비 규칙 등 — 지역별 한도와 시험 거리 확인 (→ <a href='#ver-cert'>규제 인증</a>)"],
              ]},
              { t: "note", kind: "why", title: "왜 '수동 태그만 붙인 가전'도 시험이 가볍지 않은가", html: "수동 태그는 스스로 필드를 만들지 않아 전파 규제 부담은 거의 없지만, <b>판독 성능은 가전 외장이 정합니다</b>. 같은 태그라도 플라스틱 뒤, 도장 금속 뒤, 디스플레이 근처에서 결과가 크게 달라집니다. 그래서 태그 단품 사양이 아니라 <b>최종 외장 상태에서 여러 폰으로</b> 판독 거리를 재는 것이 실질적인 검증입니다. 반대로 가전에 <b>리더 IC</b>를 넣으면 가전이 필드를 만드는 송신기가 되어 전파 인증 대상이 됩니다." },
              { t: "note", kind: "tip", title: "현장 노하우 — 사용자 안내 표시", html: "NFC는 위치를 모르면 아무리 성능이 좋아도 실패합니다. 코일 중심 위치에 <b>NFC 로고나 표시</b>를 두고, 그 위치를 판독 거리가 가장 좋은 지점과 일치시키세요. 폰은 기종마다 NFC 코일이 상단·중앙·카메라 주변 등 제각각이라, 표시 위치와 함께 '휴대폰 뒷면을 대세요' 같은 안내가 실사용 성공률을 크게 바꿉니다." },
              { t: "note", kind: "info", title: "연결", html: "공진·Q 원리는 <a href='#rf-resonance'>공진의 이해</a>, 근거리장 개념은 <a href='#ant-fields'>근거리장·원거리장</a>, 설계 탭 요약은 <a href='#proto-nfc'>NFC 코일 설계</a>를 보세요." },
            ]
          }
        ]
      }
    ]
  });
})();
