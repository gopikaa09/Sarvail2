// import React from 'react';
// import { View, Text, Dimensions, Image } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';

// export default function AppCarousel() {
//   const width = Dimensions.get('window').width;
//   const list = [
//     {
//       id: 1,
//       title: 'First Item',
//       Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxljCiU3pRUXpw-39aklTNk7BDV3G9Dn7ocw&s',
//     },
//     {
//       id: 2,
//       title: 'Second Item',
//       Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxljCiU3pRUXpw-39aklTNk7BDV3G9Dn7ocw&s',
//     },
//     {
//       id: 3,
//       title: 'Third Item',
//       Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxljCiU3pRUXpw-39aklTNk7BDV3G9Dn7ocw&s',
//     },
//   ];

//   return (
//     <View>
//       <Carousel
//         width={width}
//         height={width / 2}
//         data={list}
//         renderItem={({ item }) => (
//           <View>
//             <Image
//               source={{ uri: item.Image }}
//               style={{ width: width, height: width / 2 }}
//             />
//             <Text>{item.title}</Text>
//           </View>
//         )}
//         autoPlay={true}
//         autoPlayInterval={3000}
//       // mode={'parallax'}
//       // showLength={80}
//       />
//     </View>
//   );
// }
