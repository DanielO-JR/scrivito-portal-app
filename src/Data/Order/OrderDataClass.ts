import { currentLanguage, load } from 'scrivito'
import { DataClassSchema } from '../types'
import { localStorageOrderDataClass } from './LocalStorage/localStorageOrderDataClass'
import { pisaOrderDataClass } from './Pisa/pisaOrderDataClass'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  const mainStatus = [
    'enum',
    lang === 'de'
      ? {
          title: 'Hauptstatus',
          values: [
            { value: 'PSA_SAP_MAI_ORD_CNC_BEA', title: 'Auftragsbearbeitung' },
            { value: 'PSA_SAP_MAI_ORD_CNC_EIN', title: 'Auftragseingang' },
            {
              value: 'PSA_SAP_MAI_QUO_ORD_PRP',
              title: 'Auftrag abgeschlossen',
            },
          ],
        }
      : {
          title: 'Main status',
          values: [
            { value: 'PSA_SAP_MAI_ORD_CNC_BEA', title: 'Order processing' },
            { value: 'PSA_SAP_MAI_ORD_CNC_EIN', title: 'Order inflow' },
            { value: 'PSA_SAP_MAI_QUO_ORD_PRP', title: 'Evaluation' },
          ],
        },
  ] as const

  const status = [
    'enum',
    lang === 'de'
      ? {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_ORD_CLS', title: 'Auftrag abgeschlossen' },
            { value: 'PSA_PRO_ORD_INC', title: 'Auftragseingang' },
            { value: 'PSA_PRO_ORD_PSI_0', title: 'In ERP erfasst' },
            {
              value: 'PSA_PRO_ORD_PSI_1',
              title: 'In ERP terminiert/abgesichert',
            },
            { value: 'PSA_PRO_ORD_PSI_2', title: 'In ERP mit Rechnung' },
            { value: 'PSA_PRO_ORD_PSI_3', title: 'In ERP Teillieferung' },
            {
              value: 'PSA_PRO_ORD_PSI_4',
              title: 'In ERP Teillieferung/Teilrechnung',
            },
            {
              value: 'PSA_PRO_ORD_PSI_5',
              title: 'In ERP Teillieferung/Vollrechnung',
            },
            { value: 'PSA_PRO_ORD_PSI_6', title: 'In ERP Lieferung' },
            {
              value: 'PSA_PRO_ORD_PSI_7',
              title: 'In ERP Lieferung/Teilrechnung',
            },
            { value: 'PSA_PRO_ORD_PSI_8', title: 'In ERP storniert' },
            { value: 'PSA_PRO_ORD_PSI_9', title: 'In ERP erledigt' },
            {
              value: 'PSA_PRO_ORD_VER',
              title: 'abgelegt; auf neue Version kopiert',
            },
            { value: 'PSA_PRO_ORD_WRK', title: 'Auftrag in Bearbeitung' },
          ],
        }
      : {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_ORD_CLS', title: 'order completed' },
            { value: 'PSA_PRO_ORD_INC', title: 'order entry' },
            { value: 'PSA_PRO_ORD_PSI_0', title: 'In ERP entered' },
            { value: 'PSA_PRO_ORD_PSI_1', title: 'In ERP scheduled/allocated' },
            { value: 'PSA_PRO_ORD_PSI_2', title: 'In ERP with invoice' },
            { value: 'PSA_PRO_ORD_PSI_3', title: 'In ERP partial delivery' },
            {
              value: 'PSA_PRO_ORD_PSI_4',
              title: 'In ERP partial delivery/partial invoice',
            },
            {
              value: 'PSA_PRO_ORD_PSI_5',
              title: 'In ERP partial delivery/full invoice',
            },
            { value: 'PSA_PRO_ORD_PSI_6', title: 'In ERP delivery' },
            {
              value: 'PSA_PRO_ORD_PSI_7',
              title: 'In ERP delivery/partial invoice',
            },
            { value: 'PSA_PRO_ORD_PSI_8', title: 'In ERP canceled' },
            { value: 'PSA_PRO_ORD_PSI_9', title: 'In ERP completed' },
            {
              value: 'PSA_PRO_ORD_VER',
              title: 'discarded; copied to new version',
            },
            { value: 'PSA_PRO_ORD_WRK', title: 'order in progress' },
          ],
        },
  ] as const

  const termsOfDelivery = [
    'enum',
    lang === 'de'
      ? {
          title: 'Lieferbedingungen',
          values: [
            { value: 'FOA', title: 'FOB Flughafen' },
            { value: 'FOR', title: 'Frei Waggon' },
            { value: 'PSI_TOD_DAP', title: 'Geliefert benannter Ort' },
            { value: 'PSI_TOD_DAT', title: 'Geliefert Terminal' },
            { value: 'RFC_TOD_CFR', title: 'Kosten und Fracht' },
            { value: 'RFC_TOD_CIF', title: 'Kosten, Versicherung und Fracht' },
            { value: 'RFC_TOD_CIP', title: 'frachtfrei, versichert' },
            { value: 'RFC_TOD_CPT', title: 'frachtfrei' },
            { value: 'RFC_TOD_DAF', title: 'geliefert Grenze' },
            { value: 'RFC_TOD_DCP', title: 'Frachtfrei' },
            { value: 'RFC_TOD_DDP', title: 'geliefert verzollt' },
            { value: 'RFC_TOD_DDU', title: 'geliefert unverzollt' },
            { value: 'RFC_TOD_DEQ', title: 'geliefert ab Kai' },
            { value: 'RFC_TOD_DES', title: 'geliefert ab Schiff' },
            { value: 'RFC_TOD_EXQ', title: 'Geliefert ab Kai (verzollt)' },
            { value: 'RFC_TOD_EXW', title: 'ab Werk' },
            { value: 'RFC_TOD_FAS', title: 'frei Längsseite Schiff' },
            { value: 'RFC_TOD_FCA', title: 'frei Frachtführer' },
            { value: 'RFC_TOD_FH', title: 'Frei Haus' },
            { value: 'RFC_TOD_FOB', title: 'frei an Bord' },
            { value: 'RFC_TOD_UN', title: 'Unfrei' },
          ],
        }
      : {
          title: 'Terms of delivery',
          values: [
            { value: 'FOA', title: 'FOB Airport Named airport of departure' },
            { value: 'FOR', title: 'Free on Rail Named departure point' },
            { value: 'PSI_TOD_DAP', title: 'Delivered At Place' },
            { value: 'PSI_TOD_DAT', title: 'Delivered At Terminal' },
            { value: 'RFC_TOD_CFR', title: 'cost and freight' },
            { value: 'RFC_TOD_CIF', title: 'cost, insurance & freight' },
            { value: 'RFC_TOD_CIP', title: 'carriage and insurance paid to' },
            { value: 'RFC_TOD_CPT', title: 'carriage paid to' },
            { value: 'RFC_TOD_DAF', title: 'delivered at frontier' },
            { value: 'RFC_TOD_DCP', title: '' },
            { value: 'RFC_TOD_DDP', title: 'delivered duty paid' },
            { value: 'RFC_TOD_DDU', title: 'delivered duty unpaid' },
            { value: 'RFC_TOD_DEQ', title: 'delivered ex quay' },
            { value: 'RFC_TOD_DES', title: 'delivered ex ship' },
            { value: 'RFC_TOD_EXQ', title: '' },
            { value: 'RFC_TOD_EXW', title: 'ex works' },
            { value: 'RFC_TOD_FAS', title: 'free alongside ship' },
            { value: 'RFC_TOD_FCA', title: 'free carrier' },
            { value: 'RFC_TOD_FH', title: '' },
            { value: 'RFC_TOD_FOB', title: 'free on board' },
            { value: 'RFC_TOD_UN', title: '' },
          ],
        },
  ] as const

  const termsOfPayment = [
    'enum',
    lang === 'de'
      ? {
          title: 'Zahlungsbedingungen',
          values: [
            { value: 'PSA_TOP_10', title: 'bar innerhalb von 14 Tagen' },
            { value: 'PSA_TOP_20', title: 'bar' },
            { value: 'PSA_TOP_50', title: 'per Nachnahme' },
            { value: 'PSA_TOP_60', title: 'per Bestellung' },
            { value: 'PSI_TOP_00', title: '[00] ERP Zahlungsziel' },
            { value: 'PSI_TOP_10', title: '[10] 8 Tage 2%, 30 Tage netto' },
            { value: 'PSI_TOP_20', title: '[20] sofort netto' },
            { value: 'PSI_TOP_30', title: '[30] 30 Tage netto' },
            { value: 'PSI_TOP_40', title: 'Zahlungsziel (ERP 40)' },
            { value: 'RFC_TOP_NT60', title: 'Netto 60' },
          ],
        }
      : {
          title: 'Terms of payment',
          values: [
            { value: 'PSA_TOP_10', title: 'cash payable within 14 days' },
            { value: 'PSA_TOP_20', title: 'cash' },
            { value: 'PSA_TOP_50', title: 'by C.O.D.' },
            { value: 'PSA_TOP_60', title: 'by order' },
            { value: 'PSI_TOP_00', title: '[00] ERP Payment target' },
            { value: 'PSI_TOP_10', title: '[10] 8 days 2%, 30 days net' },
            { value: 'PSI_TOP_20', title: '[20] immediate net' },
            { value: 'PSI_TOP_30', title: '[30] 30 days net' },
            { value: 'PSI_TOP_40', title: 'Payment target (ERP 40)' },
            { value: 'RFC_TOP_NT60', title: 'Net 60' },
          ],
        },
  ] as const

  const totalPriceCurrency = [
    'enum',
    lang === 'de'
      ? {
          title: 'Währung',
          values: [
            { value: 'ZMK', title: 'Sambischer Kwacha' },
            { value: 'MWK', title: 'Malawi-Kwacha' },
            { value: 'AOA', title: 'Kwanza' },
            { value: 'MMK', title: 'Kyat' },
            { value: 'GEL', title: 'Lari' },
            { value: 'LVL', title: 'Lettische Lats' },
            { value: 'LBP', title: 'Libanesische Pfund' },
            { value: 'ALL', title: 'Lek' },
            { value: 'HNL', title: 'Lempira' },
            { value: 'SLL', title: 'Leone' },
            { value: 'ROL', title: 'Leu' },
            { value: 'LYD', title: 'Lybische Dinar' },
            { value: 'SZL', title: 'Lilangeni' },
            { value: 'LUF', title: 'Luxemburgische Francs' },
            { value: 'MGF', title: 'Malegassische Francs' },
            { value: 'MYR', title: 'Malayische Ringgit' },
            { value: 'TMM', title: 'Manat' },
            { value: 'FIM', title: 'Finnmark' },
            { value: 'MUR', title: 'Mauritische Rupien' },
            { value: 'MZM', title: 'Metical' },
            { value: 'MXN', title: 'Mexikanische Pesos' },
            { value: 'MDL', title: 'Moldavische Leu' },
            { value: 'MAD', title: 'Marokkanische Dirham' },
            { value: 'NGN', title: 'Naira' },
            { value: 'ERN', title: 'Nakfa' },
            { value: 'NAD', title: 'Namibische Dollar' },
            { value: 'NPR', title: 'Nepalesische Rupien' },
            { value: 'ANG', title: 'Niederländische Antillen Gulden' },
            { value: 'ILS', title: 'Neue Israelische Sheqel' },
            { value: 'TWD', title: 'Neue Taiwanesische Dollar' },
            { value: 'NZD', title: 'Neuseeländische Dollar' },
            { value: 'KPW', title: 'Nordkoreanische Won' },
            { value: 'NOK', title: 'Norwegische Kronen' },
            { value: 'PEN', title: 'Neue Sol' },
            { value: 'MRO', title: 'Ouguiya' },
            { value: 'TOP', title: "Pa'anga" },
            { value: 'PKR', title: 'Pakistanische Rupien' },
            { value: 'UYU', title: 'Uruguayische Pesos' },
            { value: 'PHP', title: 'Philippinische Pesos' },
            { value: 'QAR', title: 'Katarische Rial' },
            { value: 'GTQ', title: 'Quetzal' },
            { value: 'ZAR', title: 'Rand' },
            { value: 'OMR', title: 'Omanische Rial' },
            { value: 'KHR', title: 'Riel' },
            { value: 'RUR', title: 'Russische Rubel' },
            { value: 'XAF', title: 'CFA Francs BEAC' },
            { value: 'XPF', title: 'CFP Francs' },
            { value: 'CLP', title: 'Chilenische Pesos' },
            { value: 'COP', title: 'Kolumbianische Pesos' },
            { value: 'KMF', title: 'Komorische Francs' },
            { value: 'BAM', title: 'Konvertible Mark' },
            { value: 'NIO', title: 'Cordoba Oro' },
            { value: 'CRC', title: 'Costa Ricanische Colon' },
            { value: 'HRK', title: 'Kroatische Kuna' },
            { value: 'CUP', title: 'Kubanische Pesos' },
            { value: 'CYP', title: 'Zypriotische Pfund' },
            { value: 'TMT', title: 'Turkmenistan-Manat' },
            { value: 'VEF', title: 'Venezolanischer Bolívar' },
            { value: 'CZK', title: 'Tschechische Kronen' },
            { value: 'GMD', title: 'Dalasi' },
            { value: 'DKK', title: 'Dänische Kronen' },
            { value: 'MKD', title: 'Dinar' },
            { value: 'DJF', title: 'Dschibutische Francs' },
            { value: 'DOP', title: 'Dominikanische Pesos' },
            { value: 'VND', title: 'Dong' },
            { value: 'GRD', title: 'Drachmen' },
            { value: 'XCD', title: 'Ostkaribische Dollar' },
            { value: 'EGP', title: 'Ägyptische Pfund' },
            { value: 'ETB', title: 'Äthiopische Birr' },
            { value: 'EUR', title: 'Euro' },
            { value: 'FKP', title: 'Falkländische Pfund' },
            { value: 'FJD', title: 'Fidschi-Dollar' },
            { value: 'HUF', title: 'Forint' },
            { value: 'CDF', title: 'Kongo-Francs' },
            { value: 'FRF', title: 'Französische Francs' },
            { value: 'GIP', title: 'Gibraltar-Pfund' },
            { value: 'PYG', title: 'Guarani' },
            { value: 'GNF', title: 'Guinesische Francs' },
            { value: 'GYD', title: 'Guyana-Dollar' },
            { value: 'HKD', title: 'Hongkong-Dollar' },
            { value: 'UAH', title: 'Hryvnia' },
            { value: 'DEM', title: 'Deutsche Mark' },
            { value: 'RWF', title: 'Ruandesische Francs' },
            { value: 'SHP', title: 'Sankt-Helena-Pfund' },
            { value: 'SCR', title: 'Seychellische Rupien' },
            { value: 'SGD', title: 'Singapur-Dollar' },
            { value: 'SBD', title: 'Salomonische Dollar' },
            { value: 'KGS', title: 'Som' },
            { value: 'SOS', title: 'Somalische Schilling' },
            { value: 'ESP', title: 'Spanische Peseten' },
            { value: 'LKR', title: 'Srilankische Rupien' },
            { value: 'SDD', title: 'Sudanesische Dinar' },
            { value: 'SRG', title: 'Surinamesische Gulden' },
            { value: 'SEK', title: 'Schwedische Kronen' },
            { value: 'CHF', title: 'Schweizer Franken' },
            { value: 'SYP', title: 'Syrische Pfund' },
            { value: 'TJR', title: 'Tadschikische Rubel' },
            { value: 'TZS', title: 'Tansanische Schilling' },
            { value: 'KZT', title: 'Tenge' },
            { value: 'SIT', title: 'Tolar' },
            { value: 'TTD', title: 'Trinidad-und-Tobago-Dollar' },
            { value: 'MNT', title: 'Tugrik' },
            { value: 'TND', title: 'Tunesische Dinar' },
            { value: 'AED', title: 'UAE Dirham' },
            { value: 'UGX', title: 'Ugandische Schilling' },
            { value: 'USD', title: 'US-Dollar' },
            { value: 'UZS', title: 'Usbekische Sum' },
            { value: 'VUV', title: 'Vatu' },
            { value: 'YER', title: 'Jemenitische Rial' },
            { value: 'JPY', title: 'Yen' },
            { value: 'YUM', title: 'Jugoslawische Dinar' },
            { value: 'ZWD', title: 'Simbabwische Dollar' },
            { value: 'PLN', title: 'Złoty' },
            { value: 'GHS', title: 'Ghana Cedi' },
            { value: 'ZMW', title: 'Neuer Sambischer Kwacha' },
            { value: 'AFA', title: 'Afghani' },
            { value: 'DZD', title: 'Algerische Dinar' },
            { value: 'ADP', title: 'Andorranische Peseten' },
            { value: 'ARS', title: 'Argentinische Pesos' },
            { value: 'AMD', title: 'Armenische Dram' },
            { value: 'AWG', title: 'Arubanische Gulden' },
            { value: 'AUD', title: 'Australische Dollar' },
            { value: 'AZM', title: 'Aserbeidschanische Manat' },
            { value: 'BHD', title: 'Bahrainische Dinar' },
            { value: 'THB', title: 'Baht' },
            { value: 'BBD', title: 'Barbados-Dollar' },
            { value: 'BYR', title: 'Weißrussische Rubel' },
            { value: 'BZD', title: 'Belizische Dollar' },
            { value: 'VEB', title: 'Bolivar' },
            { value: 'BOB', title: 'Boliviano' },
            { value: 'BRL', title: 'Brasilianische Real' },
            { value: 'BND', title: 'Brunei-Dollar' },
            { value: 'BGN', title: 'Bulgarische Lev' },
            { value: 'BIF', title: 'Burundische Francs' },
            { value: 'CAD', title: 'Kanadische Dollar' },
            { value: 'CVE', title: 'Kapverdische Escudos' },
            { value: 'KYD', title: 'Kaimanische Dollar' },
            { value: 'GHC', title: 'Cedi' },
            { value: 'XOF', title: 'CFA Francs BCEAO' },
            { value: 'RSD', title: 'Serbische Dinar' },
            { value: 'AFN', title: 'Afghanischer Afghani' },
            { value: 'BTN', title: 'Bhutan-Ngultrum' },
            { value: 'HTG', title: 'Haiti Gourde' },
            { value: 'LSL', title: 'Lesotho Loti' },
            { value: 'MGA', title: 'Madagaskar-Ariary' },
            { value: 'PAB', title: 'Panama Balboa' },
            { value: 'RON', title: 'Rumänischer Leu (neu)' },
            { value: 'RUB', title: 'Russischer Rubel' },
            { value: 'SRD', title: 'Suriname Dollar' },
            { value: 'TJS', title: 'Tadschikistan-Somoni' },
            { value: 'XDR', title: 'Sonderziehungsrecht Internationaler Währ' },
            { value: 'MZN', title: 'Neuer Metical' },
            { value: 'XXX', title: 'Keine Währung' },
            { value: 'AZN', title: 'Manat' },
            { value: 'SDG', title: 'Sudanesische Pfund' },
            { value: 'NLG', title: 'Niederländische Gulden' },
            { value: 'IDR', title: 'Rupien' },
            { value: 'SAR', title: 'Saudische Riyal' },
            { value: 'KRW', title: 'Won' },
            { value: 'CNY', title: 'Yuan Renminbi' },
            { value: 'MOP', title: 'Pataca' },
            { value: 'SKK', title: 'Slowakische Kronen' },
            { value: 'LTL', title: 'Litauische Litus' },
            { value: 'BWP', title: 'Pula' },
            { value: 'MVR', title: 'Rufiyaa' },
            { value: 'WST', title: 'Tala' },
            { value: 'TRY', title: 'Türkische Lira' },
            { value: 'LRD', title: 'Liberianische Dollar' },
            { value: 'MTL', title: 'Maltesische Lira' },
            { value: 'ZWL', title: 'Simbabwe-Dollar' },
            { value: 'GBP', title: 'Pfund Sterling' },
            { value: 'STD', title: 'Dobra' },
            { value: 'SVC', title: 'Salvadorianische Colon' },
            { value: 'BDT', title: 'Taka' },
            { value: 'BSD', title: 'Bahamesische Dollar' },
            { value: 'BMD', title: 'Bermudische Dollar' },
            { value: 'ISK', title: 'Isländische Kronen' },
            { value: 'INR', title: 'Indische Rupien' },
            { value: 'IRR', title: 'Iranische Rial' },
            { value: 'IQD', title: 'Irakische Dinar' },
            { value: 'IEP', title: 'Irische Pfund' },
            { value: 'ITL', title: 'Italienische Lira' },
            { value: 'JMD', title: 'Jamaikanische Dollar' },
            { value: 'JOD', title: 'Jordanische Dinar' },
            { value: 'KES', title: 'Kenyanische Schilling' },
            { value: 'PGK', title: 'Kina' },
            { value: 'LAK', title: 'Kip' },
            { value: 'EEK', title: 'Estnische Kronen' },
            { value: 'KWD', title: 'Kuwaitische Dinar' },
            { value: 'SSP', title: 'Südsudanesische Pfund' },
          ],
        }
      : {
          title: 'Currency',
          values: [
            { value: 'ZMK', title: 'Zambian kwacha' },
            { value: 'MWK', title: 'Malawian kwacha' },
            { value: 'AOA', title: 'Kwanza' },
            { value: 'MMK', title: 'Kyat' },
            { value: 'GEL', title: 'Lari' },
            { value: 'LVL', title: 'Latvian Lats' },
            { value: 'LBP', title: 'Lebanese Pound' },
            { value: 'ALL', title: 'Lek' },
            { value: 'HNL', title: 'Lempira' },
            { value: 'SLL', title: 'Leone' },
            { value: 'ROL', title: 'Leu' },
            { value: 'LYD', title: 'Libyan Dinar' },
            { value: 'SZL', title: 'Lilangeni' },
            { value: 'LUF', title: 'Luxembourg Franc' },
            { value: 'MGF', title: 'Malagasy Franc' },
            { value: 'MYR', title: 'Malaysian Ringgit' },
            { value: 'TMM', title: 'Manat' },
            { value: 'FIM', title: 'Markka' },
            { value: 'MUR', title: 'Mauritius Rupee' },
            { value: 'MZM', title: 'Metical' },
            { value: 'MXN', title: 'Mexican Peso' },
            { value: 'MDL', title: 'Moldovan Leu' },
            { value: 'MAD', title: 'Moroccan Dirham' },
            { value: 'NGN', title: 'Naira' },
            { value: 'ERN', title: 'Nakfa' },
            { value: 'NAD', title: 'Namibia Dollar' },
            { value: 'NPR', title: 'Nepalese Rupee' },
            { value: 'ANG', title: 'Netherlands Antillian Guilder' },
            { value: 'ILS', title: 'New Israeli Sheqel' },
            { value: 'TWD', title: 'New Taiwan Dollar' },
            { value: 'NZD', title: 'New Zealand Dollar' },
            { value: 'KPW', title: 'North Korean Won' },
            { value: 'NOK', title: 'Norwegian Krone' },
            { value: 'PEN', title: 'Nuevo Sol' },
            { value: 'MRO', title: 'Ouguiya' },
            { value: 'TOP', title: "Pa'anga" },
            { value: 'PKR', title: 'Pakistan Rupee' },
            { value: 'UYU', title: 'Peso Uruguayo' },
            { value: 'PHP', title: 'Philippine Peso' },
            { value: 'QAR', title: 'Qatari Rial' },
            { value: 'GTQ', title: 'Quetzal' },
            { value: 'ZAR', title: 'Rand' },
            { value: 'OMR', title: 'Rial Omani' },
            { value: 'KHR', title: 'Riel' },
            { value: 'RUR', title: 'Russian Ruble' },
            { value: 'XAF', title: 'CFA Franc BEAC' },
            { value: 'XPF', title: 'CFP Franc' },
            { value: 'CLP', title: 'Chilean Peso' },
            { value: 'COP', title: 'Colombian Peso' },
            { value: 'KMF', title: 'Comoro Franc' },
            { value: 'BAM', title: 'Convertible Marks' },
            { value: 'NIO', title: 'Cordoba Oro' },
            { value: 'CRC', title: 'Costa Rican Colon' },
            { value: 'HRK', title: 'Croatian kuna' },
            { value: 'CUP', title: 'Cuban Peso' },
            { value: 'CYP', title: 'Cyprus Pound' },
            { value: 'TMT', title: 'Turkmenistan Manat' },
            { value: 'VEF', title: 'Bolívar Fuerte' },
            { value: 'CZK', title: 'Czech Koruna' },
            { value: 'GMD', title: 'Dalasi' },
            { value: 'DKK', title: 'Danish Krone' },
            { value: 'MKD', title: 'Denar' },
            { value: 'DJF', title: 'Djibouti Franc' },
            { value: 'DOP', title: 'Dominican Peso' },
            { value: 'VND', title: 'Dong' },
            { value: 'GRD', title: 'Drachma' },
            { value: 'XCD', title: 'East Caribbean Dollar' },
            { value: 'EGP', title: 'Egyptian Pound' },
            { value: 'ETB', title: 'Ethiopian Birr' },
            { value: 'EUR', title: 'Euro' },
            { value: 'FKP', title: 'Falkland Islands Pound' },
            { value: 'FJD', title: 'Fiji Dollar' },
            { value: 'HUF', title: 'Forint' },
            { value: 'CDF', title: 'Franc Congolais' },
            { value: 'FRF', title: 'French Franc' },
            { value: 'GIP', title: 'Gibraltar Pound' },
            { value: 'PYG', title: 'Guarani' },
            { value: 'GNF', title: 'Guinea Franc' },
            { value: 'GYD', title: 'Guyana Dollar' },
            { value: 'HKD', title: 'Hong Kong Dollar' },
            { value: 'UAH', title: 'Hryvnia' },
            { value: 'DEM', title: 'German Mark' },
            { value: 'RWF', title: 'Rwanda Franc' },
            { value: 'SHP', title: 'Saint Helena Pound' },
            { value: 'SCR', title: 'Seychelles Rupee' },
            { value: 'SGD', title: 'Singapore Dollar' },
            { value: 'SBD', title: 'Solomon Islands Dollar' },
            { value: 'KGS', title: 'Som' },
            { value: 'SOS', title: 'Somali Shilling' },
            { value: 'ESP', title: 'Spanish Peseta' },
            { value: 'LKR', title: 'Sri Lanka Rupee' },
            { value: 'SDD', title: 'Sudanese Dinar' },
            { value: 'SRG', title: 'Suriname Guilder' },
            { value: 'SEK', title: 'Swedish Krona' },
            { value: 'CHF', title: 'Swiss Franc' },
            { value: 'SYP', title: 'Syrian Pound' },
            { value: 'TJR', title: 'Tajik Ruble' },
            { value: 'TZS', title: 'Tanzanian Shilling' },
            { value: 'KZT', title: 'Tenge' },
            { value: 'SIT', title: 'Tolar' },
            { value: 'TTD', title: 'Trinidad and Tobago Dollar' },
            { value: 'MNT', title: 'Tugrik' },
            { value: 'TND', title: 'Tunisian Dinar' },
            { value: 'AED', title: 'UAE Dirham' },
            { value: 'UGX', title: 'Uganda Shilling' },
            { value: 'USD', title: 'US Dollar' },
            { value: 'UZS', title: 'Uzbekistan Sum' },
            { value: 'VUV', title: 'Vatu' },
            { value: 'YER', title: 'Yemeni Rial' },
            { value: 'JPY', title: 'Yen' },
            { value: 'YUM', title: 'Yugoslavian Dinar' },
            { value: 'ZWD', title: 'Zimbabwe Dollar' },
            { value: 'PLN', title: 'Złoty' },
            { value: 'GHS', title: 'New Cedi' },
            { value: 'ZMW', title: 'New Zambian Kwacha' },
            { value: 'AFA', title: 'Afghani' },
            { value: 'DZD', title: 'Algerian Dinar' },
            { value: 'ADP', title: 'Andorran Peseta' },
            { value: 'ARS', title: 'Argentine Peso' },
            { value: 'AMD', title: 'Armenian Dram' },
            { value: 'AWG', title: 'Aruban Guilder' },
            { value: 'AUD', title: 'Australian Dollar' },
            { value: 'AZM', title: 'Azerbaijanian Manat' },
            { value: 'BHD', title: 'Bahraini Dinar' },
            { value: 'THB', title: 'Baht' },
            { value: 'BBD', title: 'Barbados Dollar' },
            { value: 'BYR', title: 'Belarussian Ruble' },
            { value: 'BZD', title: 'Belize Dollar' },
            { value: 'VEB', title: 'Bolivar' },
            { value: 'BOB', title: 'Boliviano' },
            { value: 'BRL', title: 'Brazilian Real' },
            { value: 'BND', title: 'Brunei Dollar' },
            { value: 'BGN', title: 'Bulgarian Lev' },
            { value: 'BIF', title: 'Burundi Franc' },
            { value: 'CAD', title: 'Canadian Dollar' },
            { value: 'CVE', title: 'Cape Verde Escudo' },
            { value: 'KYD', title: 'Cayman Islands Dollar' },
            { value: 'GHC', title: 'Cedi' },
            { value: 'XOF', title: 'CFA Franc BCEAO' },
            { value: 'RSD', title: 'Serbian Dinar' },
            { value: 'AFN', title: 'Afghani' },
            { value: 'BTN', title: 'Bhutan-Ngultrum' },
            { value: 'HTG', title: 'Haiti Gourde' },
            { value: 'LSL', title: 'Loti' },
            { value: 'MGA', title: 'Malagasy Ariary' },
            { value: 'PAB', title: 'Balboa' },
            { value: 'RON', title: 'Romanian New Leu' },
            { value: 'RUB', title: 'Russian Ruble' },
            { value: 'SRD', title: 'Surinam Dollar' },
            { value: 'TJS', title: 'Somoni' },
            { value: 'XDR', title: 'Special Drawing Rights' },
            { value: 'MZN', title: 'New Metical' },
            { value: 'XXX', title: 'No currency' },
            { value: 'AZN', title: 'Azerbaijanian Manat' },
            { value: 'SDG', title: 'Sudanese Pound' },
            { value: 'NLG', title: 'Netherlands Guilder' },
            { value: 'IDR', title: 'Rupiah' },
            { value: 'SAR', title: 'Saudi Riyal' },
            { value: 'KRW', title: 'Won' },
            { value: 'CNY', title: 'Yuan Renminbi' },
            { value: 'MOP', title: 'Pataca' },
            { value: 'SKK', title: 'Slovak Koruna' },
            { value: 'LTL', title: 'Lithuanian Litus' },
            { value: 'BWP', title: 'Pula' },
            { value: 'MVR', title: 'Rufiyaa' },
            { value: 'WST', title: 'Tala' },
            { value: 'TRY', title: 'Turkish Lira' },
            { value: 'LRD', title: 'Liberian Dollar' },
            { value: 'MTL', title: 'Maltese Lira' },
            { value: 'ZWL', title: 'Zimbabwe Dollar' },
            { value: 'GBP', title: 'Pound Sterling' },
            { value: 'STD', title: 'Dobra' },
            { value: 'SVC', title: 'El Salvador Colon' },
            { value: 'BDT', title: 'Taka' },
            { value: 'BSD', title: 'Bahamian Dollar' },
            { value: 'BMD', title: 'Bermudian Dollar' },
            { value: 'ISK', title: 'Iceland Krona' },
            { value: 'INR', title: 'Indian Rupee' },
            { value: 'IRR', title: 'Iranian Rial' },
            { value: 'IQD', title: 'Iraqi Dinar' },
            { value: 'IEP', title: 'Irish Pound' },
            { value: 'ITL', title: 'Italian Lira' },
            { value: 'JMD', title: 'Jamaican Dollar' },
            { value: 'JOD', title: 'Jordanian Dinar' },
            { value: 'KES', title: 'Kenyan Shilling' },
            { value: 'PGK', title: 'Kina' },
            { value: 'LAK', title: 'Kip' },
            { value: 'EEK', title: 'Kroon' },
            { value: 'KWD', title: 'Kuwaiti Dinar' },
            { value: 'SSP', title: 'South Sudanese Pound' },
          ],
        },
  ] as const

  const type = [
    'enum',
    lang === 'de'
      ? {
          title: 'Art',
          values: [
            { value: 'PSA_ORD_STY_GEN_OVR', title: 'Generalüberholung' },
            { value: 'PSA_ORD_STY_NEW', title: 'Neumaschine' },
            { value: 'PSA_ORD_STY_SRV', title: 'Dienstleistung' },
            { value: 'PSA_ORD_STY_STD', title: 'Anlage' },
          ],
        }
      : {
          title: 'Type',
          values: [
            { value: 'PSA_ORD_STY_GEN_OVR', title: 'General overhaul' },
            { value: 'PSA_ORD_STY_NEW', title: 'Re-equip machine' },
            { value: 'PSA_ORD_STY_SRV', title: 'Services' },
            { value: 'PSA_ORD_STY_STD', title: 'Plant' },
          ],
        },
  ] as const

  return {
    _id: ['string', { title: 'ID' }],
    customer: ['string', { title: lang === 'de' ? 'Kunde' : 'Customer' }],
    deliveryAt: [
      'date',
      { title: lang === 'de' ? 'Lieferdatum' : 'Delivery date' },
    ],
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    keyword: ['string', { title: lang === 'de' ? 'Stichwort' : 'Keyword' }],
    mainStatus,
    number: ['string', { title: lang === 'de' ? 'Nummer' : 'Number' }],
    orderAt: ['date', { title: lang === 'de' ? 'Auftrag am' : 'Order at' }],
    quoteAt: ['date', { title: lang === 'de' ? 'Angebot am' : 'Quote at' }],
    salesPartner: [
      'string',
      { title: lang === 'de' ? 'Vertriebspartner' : 'Sales partner' },
    ],
    status,
    termsOfDelivery,
    termsOfPayment,
    totalPrice: ['number', { title: lang === 'de' ? 'Umsatz' : 'Revenue' }],
    totalPriceCurrency,
    type,
  }
}

export const Order = import.meta.env.ENABLE_PISA
  ? pisaOrderDataClass(attributes)
  : localStorageOrderDataClass(attributes)
