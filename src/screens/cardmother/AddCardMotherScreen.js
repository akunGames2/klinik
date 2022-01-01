import React from 'react'
import {
  ScrollView,
  View,
  Alert,
  Linking,
  RefreshControl,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import Styles from '../../constants/Styles'
import { BaseScreen } from '../BaseScreen'
import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import DateTimePicker from 'react-native-modal-datetime-picker'
import DateTime from '../../library/helper/DateTime'
import { insert_card_mother } from '../../store/actions/cardmotherAction'
class AddCardMotherScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      jenis_layanan: '',
      tarif: '',
      keterangan: '',
      jumlah_obat: 0,
      input: [],
      sheet: {
        type: '',
        data: []
      },
      items: [],
      countItemsId: 0,
      datePickerExpiry: {
        id: 'expiry',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
      datePickerPasang: {
        id: 'pasang',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
      datePickerKartuIbu: {
        id: 'kartuibu',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
    }
  }
  
  render() {     
    if(this.state.permission && this.state.permission.create) {
      return (
        <View style={[Styles.outerContainer,{backgroundColor: 'white'}]}>
          <ScrollView
            style={{ 
              flex: 1
            }}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            // refreshControl={
            //   <RefreshControl refreshing={this.state.loading} onRefresh={this.onRefresh} />
            // }
          >
            <Input
              label="BPS RB"
              placeholder="Masukkan BPS RB"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.bps_rb}
              onChangeText={text => this.setState({bps_rb: text})}
            />
            <Input
              label="Desa"
              placeholder="Masukkan Desa"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.desa}
              onChangeText={text => this.setState({desa: text})}
            />
            <Input
              label="Kota"
              placeholder="Masukkan Kota"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kota}
              onChangeText={text => this.setState({kota: text})}
            />
            <Input
              label="Kode Index"
              placeholder="Masukkan Kode Index"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kode_index}
              onChangeText={text => this.setState({kode_index: text})}
            />
            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerExpiry: {datePicketElement: !this.state.datePickerExpiry.datePicketElement}})
              }}
              // disabled={!this.state.switchDate}
            >
              <Input
                ref={(input) => {
                  this.inputExpiry = input
                }}
                label={"Tanggal"}
                onChangeText={text => this.setState({datePickerExpiry: {
                  ...this.state.datePickerExpiry,
                  value: text
                }})}
                placeholder="Masukkan Tanggal"
                value={this.state.datePickerExpiry.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerExpiry.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmExpiry}
              onCancel={this.hideDatePickerExpiry}
            />
            <TouchableOpacity onPress={() => this.choice('PASIEN')}>
              <Input
                label="Pasien"
                placeholder="Masukkan Pasien"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.pasien}
                onChangeText={text => this.setState({pasien: text})}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.choice('BIDAN')}>
              <Input
                label="Bidan"
                placeholder="Masukkan Bidan"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.bidan}
                onChangeText={text => this.setState({bidan: text})}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.choice('SERVICE')}>
              <Input
                label="Layanan"
                placeholder="Masukkan Layanan"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.nama_layanan}
                onChangeText={text => this.setState({nama_layanan: text})}
                editable={false}
              />
            </TouchableOpacity>
            <Input
              label="Nama Suami"
              placeholder="Masukkan Nama Suami"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nama_suami}
              onChangeText={text => this.setState({nama_suami: text})}
            />
            <Input
              label="Usia"
              placeholder="Masukkan Usia"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.usia}
              keyboardType='numeric'
              onChangeText={text => this.setState({usia: text})}
            />
            <Input
              label="Agama"
              placeholder="Masukkan Agama"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.agama}
              onChangeText={text => this.setState({agama: text})}
            />
            <Input
              label="Pekerjaan"
              placeholder="Masukkan Pekerjaan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pekerjaan}
              onChangeText={text => this.setState({pekerjaan: text})}
            />
            <Input
              label="Pendidikan"
              placeholder="Masukkan Pendidikan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pendidikan}
              onChangeText={text => this.setState({pendidikan: text})}
            />
            <Input
              label="Kawin Ke"
              placeholder="Masukkan Kawin Ke"
              leftIcon={{ type: 'feather', name: 'user' }}
              keyboardType="numeric"
              value={this.state.kawin_ke}
              onChangeText={text => this.setState({kawin_ke: text})}
            />
            <Input
              label="Lama Kawin"
              placeholder="Masukkan Lama Kawin"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.lama_kawin}
              onChangeText={text => this.setState({lama_kawin: text})}
            />
            <Input
              label="Sebab Pisah"
              placeholder="Masukkan Sebab Pisah"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.sebab_pisah}
              onChangeText={text => this.setState({sebab_pisah: text})}
            />
            <Input
              label="Sebab Mati"
              placeholder="Masukkan Sebab Mati"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.sebab_mati}
              onChangeText={text => this.setState({sebab_mati: text})}
            />
            <Input
              label="Hamil Ke"
              placeholder="Masukkan Hamil Ke"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.hamil_ke}
              keyboardType="numeric"
              onChangeText={text => this.setState({hamil_ke: text})}
            />
            <Input
              label="Komplikasi Hamil"
              placeholder="Masukkan Komplikasi Hamil"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.komplikasi_hamil}
              onChangeText={text => this.setState({komplikasi_hamil: text})}
            />
            <Input
              label="Jenis Persalinan"
              placeholder="Masukkan Jenis Persalinan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.jenis_persalinan}
              onChangeText={text => this.setState({jenis_persalinan: text})}
            />
            <Input
              label="Tempat"
              placeholder="Masukkan Tempat"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.tempat}
              onChangeText={text => this.setState({tempat: text})}
            />
            <Input
              label="Komplikasi"
              placeholder="Masukkan Komplikasi"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.komplikasi}
              onChangeText={text => this.setState({komplikasi: text})}
            />
            <Input
              label="Penolong"
              placeholder="Masukkan Penolong"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.penolong}
              onChangeText={text => this.setState({penolong: text})}
            />
            <Input
              label="JK Bayi"
              placeholder="Masukkan JK Bayi"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.jk_bayi}
              onChangeText={text => this.setState({jk_bayi: text})}
            />
            <Input
              label="Berat Bayi"
              placeholder="Masukkan Berat Bayi"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.berat_bayi}
              keyboardType="numeric"
              onChangeText={text => this.setState({berat_bayi: text})}
            />
            <Input
              label="Kondisi Bayi Lahir"
              placeholder="Masukkan Kondisi Bayi Lahir"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kondisi_bayi_lahir}
              onChangeText={text => this.setState({kondisi_bayi_lahir: text})}
            />
            <Input
              label="Kondisi Bayi Sekarang"
              placeholder="Masukkan Kondisi Bayi Sekarang"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kondisi_bayi_skrg}
              onChangeText={text => this.setState({kondisi_bayi_skrg: text})}
            />
            <Input
              label="KB"
              placeholder="Masukkan KB"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kb}
              onChangeText={text => this.setState({kb: text})}
            />
            <Input
              label="ASI"
              placeholder="Masukkan ASI"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.asi}
              onChangeText={text => this.setState({asi: text})}
            />
            <Input
              label="HAID"
              placeholder="Masukkan HAID"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.haid}
              onChangeText={text => this.setState({haid: text})}
            />
            <Input
              label="HPHT"
              placeholder="Masukkan HPHT"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.hpht}
              keyboardType="numeric"
              onChangeText={text => this.setState({hpht: text})}
            />
            <Input
              label="HPL"
              placeholder="Masukkan HPL"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.hpl}
              keyboardType="numeric"
              onChangeText={text => this.setState({hpl: text})}
            />
            <Input
              label="Berat"
              placeholder="Masukkan Berat"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.berat}
              keyboardType="numeric"
              onChangeText={text => this.setState({berat: text})}
            />
            <Input
              label="Mual Muntah"
              placeholder="Masukkan Mual Muntah"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.mual_muntah}
              onChangeText={text => this.setState({mual_muntah: text})}
            />
            <Input
              label="Pusing"
              placeholder="Masukkan Pusing"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pusing}
              onChangeText={text => this.setState({pusing: text})}
            />
            <Input
              label="Nyeri Perut"
              placeholder="Masukkan Nyeri Perut"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nyeri_perut}
              onChangeText={text => this.setState({nyeri_perut: text})}
            />
            <Input
              label="Gerak Janin"
              placeholder="Masukkan Gerak Janin"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.gerak_janin}
              onChangeText={text => this.setState({gerak_janin: text})}
            />
            <Input
              label="Oedema"
              placeholder="Masukkan Oedema"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.oedema}
              onChangeText={text => this.setState({oedema: text})}
            />
            <Input
              label="Nafsu Makan"
              placeholder="Masukkan Nafsu Makan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nafsu_makan}
              onChangeText={text => this.setState({nafsu_makan: text})}
            />
            <Input
              label="Pendarahan"
              placeholder="Masukkan Pendarahan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pendarahan}
              onChangeText={text => this.setState({pendarahan: text})}
            />
            <Input
              label="Penyakit Bumil"
              placeholder="Masukkan Penyakit Bumil"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.penyakit_bumil}
              onChangeText={text => this.setState({penyakit_bumil: text})}
            />
            <Input
              label="Penyakit Keluarga"
              placeholder="Masukkan Penyakit Keluarga"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.penyakit_keluarga}
              onChangeText={text => this.setState({penyakit_keluarga: text})}
            />
            <Input
              label="Kebiasaan Bumil"
              placeholder="Masukkan Kebiasaan Bumil"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kebiasaan_bumil}
              onChangeText={text => this.setState({kebiasaan_bumil: text})}
            />
            <Input
              label="Status TT"
              placeholder="Masukkan Status TT"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.status_tt}
              onChangeText={text => this.setState({status_tt: text})}
            />
            <Input
              label="HIV AIDS"
              placeholder="Masukkan HIV AIDS"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.hiv_aids}
              onChangeText={text => this.setState({hiv_aids: text})}
            />
            <Input
              label="Keluhan"
              placeholder="Masukkan Keluhan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.keluhan}
              onChangeText={text => this.setState({keluhan: text})}
            />
            <Input
              label="TB"
              placeholder="Masukkan TB"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.TB}
              onChangeText={text => this.setState({TB: text})}
            />
            <Input
              label="LILA"
              placeholder="Masukkan LILA"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.LILA}
              onChangeText={text => this.setState({LILA: text})}
            />
            <Input
              label="Bentuk Tubuh"
              placeholder="Masukkan Bentuk Tubuh"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.bentuk_tubuh}
              onChangeText={text => this.setState({bentuk_tubuh: text})}
            />
            <Input
              label="Kesadaran"
              placeholder="Masukkan Kesadaran"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kesadaran}
              onChangeText={text => this.setState({kesadaran: text})}
            />
            <Input
              label="Muka"
              placeholder="Masukkan Muka"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.muka}
              onChangeText={text => this.setState({muka: text})}
            />
            <Input
              label="Kulit"
              placeholder="Masukkan Kulit"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kulit}
              onChangeText={text => this.setState({kulit: text})}
            />
            <Input
              label="Mata"
              placeholder="Masukkan Mata"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.mata}
              onChangeText={text => this.setState({mata: text})}
            />
            <Input
              label="Mulut"
              placeholder="Masukkan Mulut"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.mulut}
              onChangeText={text => this.setState({mulut: text})}
            />
            <Input
              label="Gigi"
              placeholder="Masukkan Gigi"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.gigi}
              onChangeText={text => this.setState({gigi: text})}
            />
            <Input
              label="Pembesaran Kel"
              placeholder="Masukkan Pembesaran Kel"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pembesaran_kel}
              onChangeText={text => this.setState({pembesaran_kel: text})}
            />
            <Input
              label="Dada"
              placeholder="Masukkan Dada"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.dada}
              onChangeText={text => this.setState({dada: text})}
            />
            <Input
              label="Nafas"
              placeholder="Masukkan Nafas"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nafas}
              onChangeText={text => this.setState({nafas: text})}
            />
            <Input
              label="Jantung"
              placeholder="Masukkan Jantung"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.jantung}
              onChangeText={text => this.setState({jantung: text})}
            />
            <Input
              label="Payudara"
              placeholder="Masukkan Payudara"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.payudara}
              onChangeText={text => this.setState({payudara: text})}
            />
            <Input
              label="Tangan Tungkai"
              placeholder="Masukkan Tangan Tungkai"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.tangan_tungkai}
              onChangeText={text => this.setState({tangan_tungkai: text})}
            />
            <Input
              label="Reflek"
              placeholder="Masukkan Reflek"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.reflek}
              onChangeText={text => this.setState({reflek: text})}
            />
            <Input
              label="Penolong"
              placeholder="Masukkan Penolong"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.penolong}
              onChangeText={text => this.setState({penolong: text})}
            />
            <Input
              label="Tempat Bersalin"
              placeholder="Masukkan Tempat Bersalin"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.tempat_bersalin}
              onChangeText={text => this.setState({tempat_bersalin: text})}
            />
            <Input
              label="Pendamping"
              placeholder="Masukkan Pendamping"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pendamping}
              onChangeText={text => this.setState({pendamping: text})}
            />
            <Input
              label="Pendonor"
              placeholder="Masukkan Pendonor"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pendonor}
              onChangeText={text => this.setState({pendonor: text})}
            />
            <Input
              label="Sticker P4K"
              placeholder="Masukkan Sticker P4K"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.sticker_p4k}
              onChangeText={text => this.setState({sticker_p4k: text})}
            />
            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerPasang: {datePicketElement: !this.state.datePickerPasang.datePicketElement}})
              }}
              // disabled={!this.state.switchDate}
            >
              <Input
                label={"Tanggal Pasang"}
                onChangeText={text => this.setState({datePickerPasang: {
                  value: text
                }})}
                placeholder="Masukkan Tanggal Pasang"
                value={this.state.datePickerPasang.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerPasang.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmPasang}
              onCancel={this.hideDatePickerPasang}
            />
            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerKartuIbu: {datePicketElement: !this.state.datePickerKartuIbu.datePicketElement}})
              }}
              // disabled={!this.state.switchDate}
            >
              <Input
                label={"Tanggal Kartu Ibu"}
                onChangeText={text => this.setState({datePickerKartuIbu: {
                  value: text
                }})}
                placeholder="Masukkan Tanggal Kartu Ibu"
                value={this.state.datePickerKartuIbu.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerKartuIbu.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmKartuIbu}
              onCancel={this.hideDatePickerKartuIbu}
            />
            <Input
              label="Diagnosa"
              placeholder="Masukkan Diagnosa"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.diagnosa}
              onChangeText={text => this.setState({diagnosa: text})}
            />
            {/* {this.state.permission.update &&  */}
            <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
              title={"Simpan"}
              onPress={() => this.saveInput()}
            />
            {/* } */}
          </ScrollView>
        </View>
      )
    } else {
      return(
        <View>
          <Text>
            Maaf anda tidak punya akses
          </Text>
        </View>
      )
    }
  }
  
  hideDatePickerExpiry = () => {
    this.setState({datePickerExpiry: {
      value: this.state.datePickerExpiry.value
    }})
  }

  handleConfirmExpiry = (date) => {    
    this.setState({datePickerExpiry: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_DMY)
    }})
    this.hideDatePickerExpiry()
  }

  hideDatePickerKartuIbu = () => {
    this.setState({datePickerKartuIbu: {
      value: this.state.datePickerKartuIbu.value
    }})
  }

  handleConfirmKartuIbu = (date) => {    
    this.setState({datePickerKartuIbu: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_DMY)
    }})
    this.hideDatePickerKartuIbu()
  }

  hideDatePickerPasang = () => {
    this.setState({datePickerPasang: {
      value: this.state.datePickerPasang.value
    }})
  }

  handleConfirmPasang = (date) => {    
    this.setState({datePickerPasang: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_DMY)
    }})
    this.hideDatePickerPasang()
  }

  choice(mode, data=null) {
    this.props.navigation.navigate(NavKey.PRODUCTS
      , {
      mode,
      callback: (data) => {
        if(mode == 'PASIEN') {
          this.setState({pasien: data.namaproduk, id_pasien: data.idproduk})
        } else if(mode == 'BIDAN') {
          this.setState({bidan: data.namaproduk, id_bidan: data.idproduk})
        } else if(mode == 'SERVICE') {
          this.setState({nama_layanan: data.namaproduk, id_layanan: data.idproduk})
        }
      },
    })
  }

  async saveInput() {
    let data = {
      // id_kartu_ibu:this.state.id_kartu_ibu,
      // id_profil_suami:this.state.id_profil_suami, 
      // id_riwayat_perkawinan:this.state.id_riwayat_perkawinan, 
      // id_riwayat_persalinan: this.state.id_riwayat_persalinan, 
      // id_riwayat_kehamilan:this.state.id_riwayat_kehamilan, 
      // id_pemeriksaan:this.state.id_pemeriksaan, 
      // id_rencana_persalinan: this.state.id_rencana_persalinan,
      tgl_daftar: this.state.datePickerExpiry.value,
      tgl_pasang: this.state.datePickerPasang.value,
      tgl_kartu_ibu: this.state.datePickerKartuIbu.value, 
      bps_rb: this.state.bps_rb, desa: this.state.desa, kota: this.state.kota, kode_index:this.state.kode_index, id_bidan: this.state.id_bidan, bidan: this.state.nama_bidan, id_pasien: this.state.id_pasien, pasien: this.state.nama_pasien, id_layanan: this.state.id_layanan, nama_layanan: this.state.nama_layanan, nama_suami: this.state.nama_suami, usia: this.state.usia, agama: this.state.agama, pekerjaan:this.state.pekerjaan, pendidikan: this.state.pendidikan, kawin_ke: this.state.kawin_ke, lama_kawin:this.state.lama_kawin, sebab_pisah: this.state.sebab_pisah, sebab_mati: this.state.sebab_mati, hamil_ke: this.state.hamil_ke, komplikasi_hamil:this.state.komplikasi_hamil, jenis_persalinan: this.state.jenis_persalinan, tempat: this.state.tempat, komplikasi:this.state.komplikasi, penolong: this.state.penolong, jk_bayi:this.state.jk_bayi, berat_bayi: this.state.berat_bayi, kondisi_bayi_lahir:this.state.kondisi_bayi_lahir, kondisi_bayi_skrg: this.state.kondisi_bayi_skrg, kb:this.state.kb, asi:this.state.asi, haid:this.state.haid,hpht: this.state.hpht, hpl:this.state.hpl, berat:this.state.berat, mual_muntah: this.state.mual_muntah, pusing: this.state.pusing, nyeri_perut:this.state.nyeri_perut, gerak_janin: this.state.gerak_janin, oedema: this.state.oedema, nafsu_makan:this.state.nafsu_makan, pendarahan: this.state.pendarahan, penyakit_bumil:this.state.penyakit_bumil,penyakit_keluarga:this.state.penyakit_bumil, kebiasaan_bumil:this.state.kebiasaan_bumil, status_tt:this.state.status_tt,hiv_aids:this.state.hiv_aids,keluhan:this.state.keluhan, TB:this.state.TB, LILA:this.state.LILA, bentuk_tubuh: this.state.bentuk_tubuh, kesadaran: this.state.kesadaran, muka: this.state.muka, kulit: this.state.kulit, mata:this.state.mata, mulut:this.state.mulut, gigi:this.state.gigi, pembesaran_kel: this.state.pembesaran_kel, dada:this.state.dada, nafas:this.state.nafas, jantung:this.state.jantung, payudara:this.state.payudara, tangan_tungkai:this.state.tangan_tungkai, reflek:this.state.reflek,penolong:this.state.penolong, tempat_bersalin:this.state.tempat_bersalin, pendamping:this.state.pendamping, pendonor:this.state.pendonor, sticker_p4k:this.state.sticker_p4k, diagnosa:this.state.diagnosa
    }
    
    const result = await this.props.dispatch(insert_card_mother(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.CARD_MOTHER)
    }else {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.CARD_MOTHER)
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('kartu_ibu')
    this.setState({permission: data})
    // this.get_user();
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

AddCardMotherScreen.navigationOptions = ({ navigation }) => ({
  title: 'TAMBAH DATA',
  // headerTitleStyle: { alignSelf: 'center' },
  headerStyle: { backgroundColor: Colors.textInverse, elevation: 10  },
  headerTintColor: Colors.colorDark,
  headerLeft:() => (
    <TouchableOpacity
      style={{ marginLeft: Dimens.paddingMedium }}
      onPress={() => navigation.goBack(null)}
    >
      <Icon name="arrow-left" size={Dimens.iconMedium2} color={Colors.colorDark} />
    </TouchableOpacity>
  ),
  // headerRight: () => (
  //   <TouchableOpacity
  //     style={{ marginRight: Dimens.paddingMedium }}      
  //   >
  //     <Icon name="comment" size={Dimens.iconMedium2} color={Colors.colorDark} />
  //   </TouchableOpacity>
  // ),
})
export default connect(
  (state) => ({ ...state.Auth}),
  (dispatch) => ({ dispatch })
)(AddCardMotherScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})