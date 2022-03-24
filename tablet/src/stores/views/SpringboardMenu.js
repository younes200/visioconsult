import images from "@assets/images";
const SpringboardMenu = {
  title: "Principal",
  navigation: {
    type: "children",
    value: [
      // {
      //   title: "APPS",
      //   navigation: {
      //     type: "screen",
      //     value: "Launcher"
      //   }
      // },
      {
        title: "CONTACTS",
        icon: {
          type: "Ionicons",
          name: "contacts"
        },
        image: images.contacts,
        imageSelected: images.contactsSelected,
        navigation: {
          type: "children",
          value: []
        }
      },
      {
        title: "AGENDA",
        icon: {
          type: "MaterialCommunityIcons",
          name: "calendar-clock"
        },
        image: images.event,
        imageSelected: images.eventSelected,
        navigation: {
          type: "children",
          value: [
            {
              title: "ALMANACH",
              icon: {
                type: "Ionicons",
                name: "bookmarks"
              },
              image: images.agenda2,
              imageSelected: images.agenda2Selected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "PROGRAMME",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "television-classic"
                    },
                    image: images.television,
                    imageSelected: images.televisionSelected,
                    navigation: {
                      type: "screen",
                      value: "Programme"
                    }
                  },
                  {
                    title: "HUMOUR",
                    icon: {
                      type: "MaterialIcons",
                      name: "mood"
                    },
                    image: images.happy,
                    imageSelected: images.happySelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "DICTON",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "book-open-page-variant"
                    },
                    image: images.dicton,
                    imageSelected: images.dictonSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "HOROSCOPE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "zodiac-sagittarius"
                    },
                    image: images.pisces,
                    imageSelected: images.piscesSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "ASTUCE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "auto-fix"
                    },
                    image: images.magic,
                    imageSelected: images.magic,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  }
                ]
              }
            },
            {
              title: "CALENDRIER",
              icon: {
                type: "MaterialCommunityIcons",
                name: "calendar-today"
              },
              image: images.calendar,
              imageSelected: images.calendarSelected,
              navigation: {
                type: "none",
                value: null
              }
            },
            {
              title: "RAPPELS",
              icon: {
                type: "MaterialCommunityIcons",
                name: "alarm"
              },
              image: images.stopwatch,
              imageSelected: images.stopwatchSelected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "ANNIVERSAIRE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "cake-variant"
                    },
                    image: images.birthdayCake,
                    imageSelected: images.birthdayCakeSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "PLANNING",
                    icon: {
                      type: "Ionicons",
                      name: "calendar"
                    },
                    image: images.planning,
                    imageSelected: images.planningSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "REVEIL",
                    icon: {
                      type: "Ionicons",
                      name: "alarm"
                    },
                    image: images.alarmClock,
                    imageSelected: images.alarmClockSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "RENDEZ-VOUS",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "calendar-edit"
                    },
                    image: images.appointment,
                    imageSelected: images.appointmentSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "JARDINAGE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "flower"
                    },
                    image: images.sprout,
                    imageSelected: images.sproutSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  }
                ]
              }
            },
            {
              title: "MÉMOS",
              icon: {
                type: "MaterialCommunityIcons",
                name: "notebook"
              },
              image: images.notebook,
              imageSelected: images.notebookSelected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "COURSES",
                    icon: {
                      type: "Feather",
                      name: "shopping-cart"
                    },
                    image: images.shoppingCart,
                    imageSelected: images.shoppingCartSelected,
                    navigation: {
                      type: "screen",
                      value: "Courses"
                    }
                  },
                  {
                    title: "DICTAPHONE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "microphone-outline"
                    },
                    image: images.mic,
                    imageSelected: images.micSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "TÂCHES",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "format-list-checks"
                    },
                    image: images.list,
                    imageSelected: images.listSelected,
                    navigation: {
                      type: "screen",
                      value: "Taches"
                    }
                  },
                  {
                    title: "NOTES",
                    icon: {
                      type: "Ionicons",
                      name: "list"
                    },
                    image: images.notepad,
                    imageSelected: images.notepadSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  }
                ]
              }
            },
            {
              title: "INFOS MAIRE",
              icon: {
                type: "MaterialCommunityIcons",
                name: "city-variant"
              },
              image: images.cityHall,
              imageSelected: images.cityHallSelected,
              navigation: {
                type: "screen",
                value: "InfoMaire"
              }
            }
          ]
        }
      },
      {
        title: "LOISIRS",
        icon: {
          type: "MaterialCommunityIcons",
          name: "music-box-outline"
        },
        image: images.loisirs,
        imageSelected: images.loisirsSelected,
        navigation: {
          type: "children",
          value: [
            {
              title: "GALERIE",
              icon: {
                type: "MaterialCommunityIcons",
                name: "image-filter"
              },
              image: images.gallery,
              imageSelected: images.gallerySelected,
              navigation: {
                type: "screen",
                value: "Galerie"
              }
            },
            {
              title: "INTERNET",
              icon: {
                type: "MaterialCommunityIcons",
                name: "web"
              },
              image: images.domain,
              imageSelected: images.domainSelected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "RECHERCHE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "search-web"
                    },
                    image: images.explore,
                    imageSelected: images.exploreSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "FAVORIS",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "folder-star"
                    },
                    image: images.folder,
                    imageSelected: images.folderSelected,
                    navigation: {
                      type: "children",
                      value: [
                        {
                          title: "BANQUE",
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "ORANGE",
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "KINÉ",
                          navigation: {
                            type: "screen",
                            value: "Kine"
                          }
                        },
                        {
                          title: "AMELI",
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "PORTAGE",
                          navigation: {
                            type: "none",
                            value: null
                          }
                        }
                      ]
                    }
                  },
                  {
                    title: "PRESSE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "newspaper"
                    },
                    image: images.foldedNewspaper,
                    imageSelected: images.foldedNewspaperSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "VOD",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "film"
                    },
                    image: images.countdown,
                    imageSelected: images.countdownSelected,
                    navigation: {
                      type: "screen",
                      value: "Vod"
                    }
                  },
                  {
                    title: "RÉSEAUX",
                    icon: {
                      type: "Ionicons",
                      name: "share"
                    },
                    image: images.share,
                    imageSelected: images.shareSelected,
                    navigation: {
                      type: "children",
                      value: [
                        {
                          title: "TWITTER",
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "twitter-circle",
                            color: "#85C1E9"
                          },
                          image: images.twitter,
                          imageSelected: images.twitter,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "TCHAT",
                          image: images.vibook,
                          imageSelected: images.vibook,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "FACEBOOK",
                          image: images.fb,
                          imageSelected: images.fb,
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "facebook-box",
                            color: "#2471A3"
                          },
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "INSTAGRAM",
                          image: images.instagram,
                          imageSelected: images.instagram,
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "instagram",
                            color: "#EC7063"
                          },
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "WHATSAPP",
                          image: images.whatsapp,
                          imageSelected: images.whatsapp,
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "whatsapp",
                            color: "#1E8449"
                          },
                          navigation: {
                            type: "none",
                            value: null
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              title: "JEUX",
              icon: {
                type: "MaterialCommunityIcons",
                name: "gamepad-variant"
              },
              image: images.gamepad,
              imageSelected: images.gamepadSelected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "BRIKS",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "domain"
                    },
                    image: images.tetra,
                    imageSelected: images.tetraSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "ECHECS",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "chess-knight"
                    },
                    image: images.chess,
                    imageSelected: images.chessSelected,
                    navigation: {
                      type: "screen",
                      value: "Echecs"
                    }
                  },
                  {
                    title: "MÉMO",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "memory"
                    },
                    image: images.memory,
                    imageSelected: images.memorySelected,
                    navigation: {
                      type: "screen",
                      value: "Memo"
                    }
                  },
                  {
                    title: "SOLITAIRE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "cards-playing-outline"
                    },
                    image: images.solitaire,
                    imageSelected: images.solitaireSelected,
                    navigation: {
                      type: "screen",
                      value: "Solitaitre"
                    }
                  },
                  {
                    title: "SCRABBLE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "cube-unfolded"
                    },
                    image: images.scrabble,
                    imageSelected: images.scrabbleSelected,
                    navigation: {
                      type: "screen",
                      value: "Scrabble"
                    }
                  }
                ]
              }
            },
            {
              title: "AUDIO",
              icon: {
                type: "MaterialCommunityIcons",
                name: "volume-high"
              },
              image: images.speaker,
              imageSelected: images.speakerSelected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "MUSIQUES",
                    icon: {
                      type: "Ionicons",
                      name: "musical-notes"
                    },
                    image: images.musicPlayer,
                    imageSelected: images.musicPlayerSelected,
                    navigation: {
                      type: "screen",
                      value: "Musiques"
                    }
                  },
                  {
                    title: "KARAOKÉ",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "microphone-variant"
                    },
                    image: images.karaoke,
                    imageSelected: images.karaokeSeleted,
                    navigation: {
                      type: "screen",
                      value: "Karaoke"
                    }
                  },
                  {
                    title: "RADIOS",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "radio"
                    },
                    image: images.radio,
                    imageSelected: images.radioSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "PODCAST",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "access-point"
                    },
                    image: images.antenna,
                    imageSelected: images.antennaSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "LIVRES AUDIO",
                    icon: {
                      type: "Ionicons",
                      name: "book"
                    },
                    image: images.audioBook,
                    imageSelected: images.audioBookSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  }
                ]
              }
            },
            {
              title: "CAMÉRA",
              icon: {
                type: "MaterialCommunityIcons",
                name: "webcam"
              },
              image: images.webcam,
              imageSelected: images.webcamSelected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "PHOTOS",
                    icon: {
                      type: "Ionicons",
                      name: "camera"
                    },
                    image: images.photoCamera,
                    imageSelected: images.photoCameraSelected,
                    navigation: {
                      type: "screen",
                      value: "Photos"
                    }
                  },
                  {
                    title: "SCANNER",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "scanner"
                    },
                    image: images.scanner,
                    imageSelected: images.scannerSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "CODE-BARRE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "barcode-scan"
                    },
                    image: images.barCode,
                    imageSelected: images.barCodeSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "QR CODE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "qrcode-scan"
                    },
                    image: images.qrcode,
                    imageSelected: images.qrcodeSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "BADGING",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "account-badge-horizontal"
                    },
                    image: images.stewardess,
                    imageSelected: images.stewardessSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        title: "BIEN-ÊTRE",
        icon: {
          type: "Ionicons",
          name: "flower"
        },
        image: images.harmony,
        imageSelected: images.harmonySelected,
        navigation: {
          type: "children",
          value: [
            {
              title: "PLANÈTE",
              icon: {
                type: "Ionicons",
                name: "globe"
              },
              image: images.earthDay,
              imageSelected: images.earthDaySelected,
              navigation: {
                type: "screen",
                value: "Planete"
              }
            },
            {
              title: "SOINS",
              icon: {
                type: "MaterialCommunityIcons",
                name: "needle"
              },
              image: images.soins,
              imageSelected: images.soinsSelected,
              navigation: {
                type: "screen",
                value: "Soins"
              }
            },
            {
              title: "SANTÉ",
              icon: {
                type: "MaterialCommunityIcons",
                name: "heart-box-outline"
              },
              image: images.donation,
              imageSelected: images.donationSelected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "TESTS",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "flask-outline"
                      // type: 'Feather',
                      // name: 'activity'
                    },
                    image: images.test,
                    imageSelected: images.testSelected,
                    navigation: {
                      type: "children",
                      value: [
                        {
                          title: "SOMMEIL",
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "hotel"
                          },
                          image: images.sommeil,
                          imageSelected: images.sommeilSelected,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "VISION",
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "glasses"
                          },
                          image: images.vision,
                          imageSelected: images.visionSelected,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "AUDITION",
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "ear-hearing"
                          },
                          image: images.auditionEar,
                          imageSelected: images.auditionEarSelected,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "LANGUAGE",
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "microphone-variant"
                          },
                          image: images.language,
                          imageSelected: images.languageSeleted,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "DEXTÉRITÉ",
                          // icon: {
                          //   type: 'MaterialCommunityIcons',
                          //   name: 'bullseye-arrow'
                          // },
                          icon: {
                            type: "Feather",
                            name: "target"
                          },
                          image: images.archery,
                          imageSelected: images.archerySelected,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        }
                      ]
                    }
                  },
                  {
                    title: "MESURES",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "heart-pulse"
                    },
                    image: images.heartbeat,
                    imageSelected: images.heartbeatSelected,
                    navigation: {
                      type: "children",
                      value: [
                        {
                          title: "TENSION",
                          icon: {
                            type: "",
                            name: ""
                          },
                          image: images.bloodpressure,
                          imageSelected: images.bloodpressureSelected,
                          navigation: {
                            type: "screen",
                            value: "Tension"
                          }
                        },
                        {
                          title: "SATURATION",
                          icon: {
                            type: "",
                            name: ""
                          },
                          image: images.oxymetre,
                          imageSelected: images.oxymetreSelected,
                          navigation: {
                            type: "screen",
                            value: "Saturation"
                          }
                        },
                        {
                          title: "TEMPÉRATURE",
                          icon: {
                            type: "Ionicons",
                            name: "thermometer"
                          },
                          image: images.thermometer,
                          imageSelected: images.thermometerSelected,
                          navigation: {
                            type: "screen",
                            value: "Temperatue"
                          }
                        },
                        {
                          title: "ACTIVITÉ",
                          icon: {
                            type: "Feather",
                            name: "activity"
                          },
                          image: images.fitnessBracelet,
                          imageSelected: images.fitnessBraceletSelected,
                          navigation: {
                            type: "screen",
                            value: "Activite"
                          }
                        },
                        {
                          title: "PILLULIER",
                          icon: {
                            type: "",
                            name: ""
                          },
                          image: images.pills,
                          imageSelected: images.pillsSelected,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        }
                      ]
                    }
                  },
                  {
                    title: "PHARMACIE",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "pharmacy"
                    },
                    image: images.caducet,
                    imageSelected: images.caducetSelected,
                    navigation: {
                      type: "children",
                      value: [
                        {
                          title: "BON PLANS",
                          icon: {
                            type: "Feather",
                            name: "tag"
                          },
                          image: images.tag,
                          imageSelected: images.tagSelected,
                          navigation: {
                            type: "screen",
                            value: "PharmaPlans"
                          }
                        },
                        {
                          title: "CATALOGUE",
                          icon: {
                            type: "Ionicons",
                            name: "albums"
                          },
                          image: images.webcam,
                          imageSelected: images.webcamSelected,
                          navigation: {
                            type: "screen",
                            value: "PharmaCatalogue"
                          }
                        },
                        {
                          title: "PHARMACIEN",
                          icon: {
                            type: "Ionicons",
                            name: "person"
                          },
                          image: images.pharmacien,
                          imageSelected: images.pharmacienSelected,
                          navigation: {
                            type: "children",
                            value: [
                              {
                                title: "ORDONNANCE",
                                icon: {
                                  type: "MaterialCommunityIcons",
                                  name: "webcam"
                                },
                                image: images.webcam,
                                imageSelected: images.webcamSelected,
                                navigation: {
                                  type: "none",
                                  value: null
                                }
                              },
                              {
                                title: "VISIOCONSEIL",
                                icon: {
                                  type: "Ionicons",
                                  name: "desktop"
                                },
                                image: images.visioconseil,
                                imageSelected: images.visioconseilSelected,
                                navigation: {
                                  type: "screen",
                                  value: "VisioConseil"
                                }
                              },
                              {
                                title: "VISIO ETP",
                                icon: {
                                  type: "Ionicons",
                                  name: "desktop"
                                },
                                image: images.visioETP,
                                imageSelected: images.visioETPSelected,
                                navigation: {
                                  type: "screen",
                                  value: "VisioETP"
                                }
                              },
                              {
                                title: "COMMANDE",
                                icon: {
                                  type: "MaterialCommunityIcons",
                                  name: "home"
                                },
                                image: images.permanence,
                                imageSelected: images.permanenceSelecetd,
                                navigation: {
                                  type: "screen",
                                  value: "Commande"
                                }
                              },
                              {
                                title: "COURCIER",
                                image: images.pills,
                                imageSelected: images.pillsSelected,
                                navigation: {
                                  type: "none",
                                  value: null
                                }
                              }
                            ]
                          }
                        },
                        {
                          title: "SITE WEB",
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "application"
                          },
                          image: images.webPharma,
                          imageSelected: images.webPharmaSelected,
                          navigation: {
                            type: "screen",
                            value: "PharmaWeb"
                          }
                        },
                        {
                          title: "PERMANENCE",
                          icon: {
                            type: "MaterialCommunityIcons",
                            name: "home"
                          },
                          image: images.permanence,
                          imageSelected: images.permanenceSelecetd,
                          navigation: {
                            type: "screen",
                            value: "PharmaPermanence"
                          }
                        }
                      ]
                    }
                  },
                  {
                    title: "TRAITEMENT",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "alarm-plus"
                    },
                    image: images.medicine,
                    imageSelected: images.medicineSelected,
                    navigation: {
                      type: "children",
                      value: [
                        {
                          title: "MATIN",
                          // icon: {
                          //   type: 'Feather',
                          //   name: 'clock'
                          // },
                          image: images.matin,
                          imageSelected: images.matinSelected,
                          navigation: {
                            type: "screen",
                            value: "TraitementMatin"
                          }
                        },
                        {
                          title: "MIDI",
                          // icon: {
                          //   type: 'Feather',
                          //   name: 'clock'
                          // },
                          image: images.midi,
                          imageSelected: images.midiSelected,
                          navigation: {
                            type: "screen",
                            value: "TraitementMidi"
                          }
                        },
                        {
                          title: "NOTICE",
                          image: images.identification,
                          imageSelected: images.identificationSelected,
                          navigation: {
                            type: "none",
                            value: null
                          }
                        },
                        {
                          title: "SOIR",
                          // icon: {
                          //   type: 'Feather',
                          //   name: 'clock'
                          // },
                          image: images.soiree,
                          imageSelected: images.soireeSelected,
                          navigation: {
                            type: "screen",
                            value: "TraitementSoir"
                          }
                        },
                        {
                          title: "COUCHER",
                          // icon: {
                          //   type: 'Feather',
                          //   name: 'clock'
                          // },
                          image: images.coucher,
                          imageSelected: images.coucherSelected,
                          navigation: {
                            type: "screen",
                            value: "TraitementCoucher"
                          }
                        }
                      ]
                    }
                  },
                  {
                    title: "MÉDECIN",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "doctor"
                    },
                    image: images.doctor,
                    imageSelected: images.doctorSelected,
                    navigation: {
                      type: "screen",
                      value: "Medecin"
                    }
                  }
                ]
              }
            },
            {
              title: "FORME",
              icon: {
                type: "Ionicons",
                name: "bicycle"
              },
              image: images.fitness,
              imageSelected: images.fitnessSelected,
              navigation: {
                type: "screen",
                value: "Forme"
              }
            },
            {
              title: "NUTRITION",
              icon: {
                type: "MaterialCommunityIcons",
                name: "food"
              },
              image: images.healthyNutrition,
              imageSelected: images.healthyNutritionSelected,
              navigation: {
                type: "screen",
                value: "Nutrition"
              }
            }
          ]
        }
      },
      {
        title: "DOMOTIQUE",
        icon: {
          type: "MaterialCommunityIcons",
          name: "home-automation"
        },
        image: images.home,
        imageSelected: images.homeSelected,
        navigation: {
          type: "children",
          value: [
            {
              title: "ÉNERGIES",
              icon: {
                type: "Feather",
                name: "battery-charging"
              },
              image: images.battery,
              imageSelected: images.batterySelected,
              navigation: {
                type: "none",
                value: null
              }
            },
            {
              title: "CHAUFFAGE",
              // icon: {
              //   type:'Feather',
              //   name: 'battery-charging'
              // },
              image: images.heater,
              imageSelected: images.heaterSelected,
              navigation: {
                type: "screen",
                value: "Chauffage"
              }
            },
            {
              title: "ECLAIRAGE",
              icon: {
                type: "MaterialCommunityIcons",
                name: "lightbulb-on-outline"
              },
              image: images.lightBulb,
              imageSelected: images.lightBulbSelected,
              navigation: {
                type: "screen",
                value: "Eclairage"
              }
            },
            {
              title: "VOLETS",
              icon: {
                type: "MaterialCommunityIcons",
                name: "view-headline"
              },
              image: images.jalousie,
              imageSelected: images.jalousieSelected,
              navigation: {
                type: "screen",
                value: "Volets"
              }
            },
            {
              title: "SÉCURITÉ",
              icon: {
                type: "MaterialCommunityIcons",
                name: "lock-outline"
              },
              image: images.security,
              imageSelected: images.securitySelected,
              navigation: {
                type: "children",
                value: [
                  {
                    title: "ALARME",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "alarm-light"
                    },
                    image: images.siren,
                    imageSelected: images.sirenSelected,
                    navigation: {
                      type: "screen",
                      value: "Alarme"
                    }
                  },
                  {
                    title: "CAPTEURS",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "nfc-variant"
                    },
                    image: images.capteur,
                    imageSelected: images.capteurSelected,
                    navigation: {
                      type: "screen",
                      value: "Capteurs"
                    }
                  },
                  {
                    title: "LOCALISER",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "map-marker-radius"
                    },
                    image: images.locate,
                    imageSelected: images.locateSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  },
                  {
                    title: "VISIODOM",
                    icon: {
                      type: "MaterialCommunityIcons",
                      name: "doorbell-video"
                    },
                    image: images.room,
                    imageSelected: images.roomSelected,
                    navigation: {
                      type: "screen",
                      value: "VisioDOM"
                    }
                  },
                  {
                    title: "VIVOX",
                    icon: {
                      type: "MaterialCommunityIcons",
                      // name: 'audio-video'
                      name: "television"
                    },
                    image: images.vivox,
                    imageSelected: images.vivoxSelected,
                    navigation: {
                      type: "none",
                      value: null
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
};

const st = [
  [
    "Jour de l'An",
    "Basile",
    "Geneviève",
    "Odilon",
    "Edouard",
    "Melaine",
    "Raymond",
    "Lucien",
    "Alix",
    "Guillaume",
    "Paulin",
    "Tatiana",
    "Yvette",
    "Nina",
    "Rémi",
    "Marcel",
    "Roseline",
    "Prisca",
    "Marius",
    "Sébastien",
    "Agnès",
    "Vincent",
    "Barnard",
    "François",
    "Paul",
    "Paule",
    "Angèle",
    "Thomas",
    "Gildas",
    "Martine",
    "Marcelle"
  ],
  [
    "Ella",
    "Présention",
    "Blaise",
    "Véronique",
    "Agathe",
    "Gaston",
    "Eugènie",
    "Jacqueline",
    "Apolline",
    "Arnaud",
    "ND Lourdes",
    "Félix",
    "Béatrice",
    "Valentin",
    "Claude",
    "Julienne",
    "Alexis",
    "Bernadette",
    "Gabin",
    "Aimée",
    "Cendres",
    "Isabelle",
    "Lazare",
    "Modeste",
    "Roméo",
    "Nestor",
    "Honorine",
    "Romain",
    "Auguste"
  ],
  [
    "Aubin",
    "Charles",
    "Guénolé",
    "Casimir",
    "Olive",
    "Colette",
    "Félicité",
    "Jean",
    "Françoise",
    "Vivien",
    "Rosine",
    "Justine",
    "Rodrigue",
    "Mathilde",
    "Louise",
    "Bénédicte",
    "Patrice",
    "Cyrille",
    "Joseph",
    "Herbert",
    "Clémence",
    "Léa",
    "Victorien",
    "Karine",
    "Ann.",
    "Larissa",
    "Habib",
    "Gontran",
    "Gwladys",
    "Amédée",
    "Benjamin"
  ],
  [
    "Hugues",
    "Sandrine",
    "Richard",
    "Isidore",
    "Irène",
    "Marcellin",
    "JB.de la S",
    "Julie",
    "Gautier",
    "Fulbert",
    "Stanislas",
    "Jules",
    "Ida",
    "Maxime",
    "Paterne",
    "Benoït",
    "Anicet",
    "Parfait",
    "Emma",
    "Odette",
    "Anselme",
    "Alexandre",
    "Georges",
    "Fidèle",
    "Marc",
    "Alida",
    "Zita",
    "Valérie",
    "Catherine",
    "Robert"
  ],
  [
    "Fête du travail",
    "Boris",
    "Philippe",
    "Sylvain",
    "Judith",
    "Prudence",
    "Gisèle",
    "Armistice 1945",
    "Pâcome",
    "Solange",
    "Estelle",
    "Achille",
    "Rolande",
    "Matthias",
    "Denise",
    "Honoré",
    "Pascal",
    "Eric",
    "Yves",
    "Bernardin",
    "Constantin",
    "Emile",
    "Didier",
    "Donatien",
    "Sophie",
    "Béranger",
    "Augustin",
    "Germain",
    "Aymar",
    "Ferdinand",
    "Visitation"
  ],
  [
    "Justin",
    "Blandine",
    "Kévin",
    "Clotilde",
    "Igor",
    "Norbert",
    "Gilbert",
    "Médard",
    "Diane",
    "Landry",
    "Yolande",
    "Guy",
    "Antoine",
    "Elisée",
    "Germaine",
    "J.F.Régis",
    "Hervé",
    "Léonce",
    "Romuald",
    "Silvère",
    "Rodolphe",
    "Alban",
    "Audrey",
    "Baptiste",
    "Prosper",
    "Anthelme",
    "Fernand",
    "Irénée",
    "Paul/Pierre",
    "Martial"
  ],
  [
    "Thierry",
    "Martinien",
    "Thomas",
    "Florent",
    "Antoine",
    "Mariette",
    "Raoul",
    "Thibaut",
    "Amandine",
    "Ulrich",
    "Benoït",
    "Olivier",
    "Joël",
    "Camille",
    "Donald",
    "ND.Carmel",
    "Caroline",
    "Frédéric",
    "Arsène",
    "Marina",
    "Victor",
    "Madeleine",
    "Brigitte",
    "Christine",
    "Jacques",
    "Anne",
    "Nathalie",
    "Samson",
    "Marthe",
    "Juliette",
    "Ignace"
  ],
  [
    "Alphonse",
    "Julien",
    "Lydie",
    "Jean Marie",
    "Oswald",
    "Transf.",
    "Gaétan",
    "Dominique",
    "Amour",
    "Laurent",
    "Claire",
    "Clarisse",
    "Hippolyte",
    "Evrard",
    "Alfred",
    "Armel",
    "Hyacinthe",
    "Hélène",
    "Jean",
    "Bernard",
    "Christophe",
    "Fabrice",
    "Rose",
    "Barthélémy",
    "Louis",
    "Natacha",
    "Monique",
    "Augustin.",
    "Sabine",
    "Fiacre",
    "Aristide"
  ],
  [
    "Gilles",
    "Ingrid",
    "Grégoire",
    "Rosalie",
    "Raïssa",
    "Bertrand",
    "Reine",
    "Nativité",
    "Alain",
    "Inés",
    "Adelphe",
    "Apollinaire",
    "Aimé",
    "Ste-Croix",
    "Roland",
    "Edith",
    "Renaud",
    "Nadège",
    "Amélie",
    "Davy",
    "Mathieu",
    "Maurice",
    "Constant",
    "Thècle",
    "Hermann",
    "Côme",
    "Vincent",
    "Venceslas",
    "Gabriel",
    "Jérôme"
  ],
  [
    "Thérèse",
    "Léger",
    "Gérard",
    "François",
    "Fleur",
    "Bruno",
    "Serge",
    "Pélagie",
    "Denis",
    "Ghislain",
    "Firmin",
    "Wilfried",
    "Géraud",
    "Juste",
    "Thérèse",
    "Edwige",
    "Baudoin",
    "Luc",
    "René",
    "Adeline",
    "Céline",
    "Elodie",
    "Jean",
    "Florentin",
    "Enguerran",
    "Dimitri",
    "Emeline",
    "Simon",
    "Narcisse",
    "Bienvenue",
    "Quentin"
  ],
  [
    "Toussaint",
    "Défunts",
    "Hubert",
    "Charles",
    "Sylvie",
    "Bertille",
    "Carine",
    "Geoffroy",
    "Théodore",
    "Léon",
    "Martin",
    "Christian",
    "Brice",
    "Sidoine",
    "Albert",
    "Marguerite",
    "Elisabeth",
    "Aude",
    "Tanguy",
    "Edmond",
    "Présentat.",
    "Cécile",
    "Clément",
    "Augusta",
    "Catherine",
    "Delphine",
    "Séverin",
    "Jacques",
    "Saturnin",
    "André"
  ],
  [
    "Florence",
    "Viviane",
    "François",
    "Barbara",
    "Gérald",
    "Nicolas",
    "Ambroise",
    "Imm.Conc.",
    "Pierre",
    "Romaric",
    "Daniel",
    "Chantal",
    "Lucie",
    "Odile",
    "Ninon",
    "Alice",
    "Gaël",
    "Gatien",
    "Urbain",
    "Abraham",
    "Pierre",
    "Françoise",
    "Armand",
    "Adèle",
    "Noël",
    "Etienne",
    "Jean",
    "Innocents",
    "David",
    "Roger",
    "Sylvestre"
  ]
];
module.exports = { SpringboardMenu, st };
