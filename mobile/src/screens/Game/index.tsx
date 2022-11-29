import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../types/navigation';

import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {

    const route = useRoute();
    const game = route.params as GameParams;

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    async function getDiscordUser(adsId: string) {
        fetch(`http://192.168.1.75:3333/ads/${adsId}/discord`)
        .then(response => response.json())
        .then(data => {})
    }

    const [duos, setDuos] = useState<DuoCardProps[]>([]);

    const [discordDuoSelected, setDiscordDuoSelected] = useState('')

    useEffect(() => {
        fetch(`http://192.168.1.75:3333/games/${game.id}/ads`)
        .then(response => response.json())
        .then(data => setDiscordDuoSelected(data.discord))
    }, []);

    return (
        <Background>
        <SafeAreaView style={styles.container}>

            <View style={styles.container}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Entypo 
                      name="chevron-thin-left"
                      color={THEME.COLORS.CAPTION_300}
                      size={20}
                    />
                </TouchableOpacity>

                <Image
                    source={logoImg}
                    style={styles.logo}
                />

                <View style={styles.right} />
            </View>

            <Image
                source={{uri: game.bannerUrl}}
                style={styles.cover}
                resizeMode="cover"
            />

            <Heading 
                title={game.title}
                subtitle='Conecte-se e comece a jogar!'
            />

            <FlatList 
            data={duos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <DuoCard 
                data={item}
                onConnect={() => getDiscordUser(item.id)} 
                />
            )}
            horizontal
            contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
            showsHorizontalScrollIndicator={false}
            
            style={styles.containerList}

            ListEmptyComponent={() => (
                <Text style={styles.emptyListText}>
                    Não há anúncios publicados ainda.
                </Text>
            )}
            />

            <DuoMatch 
              visible={discordDuoSelected.length>0}
              discord={discordDuoSelected}
              onClose={() => setDiscordDuoSelected('')}
            />
            
        </SafeAreaView>
        </Background>
    )
} 