-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bjppjq69j7pcuovmqxx9-mysql.services.clever-cloud.com:20467
-- Generation Time: Aug 06, 2024 at 05:32 PM
-- Server version: 8.0.34-26
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bjppjq69j7pcuovmqxx9`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `ACCOUNT_ID` int NOT NULL,
  `ITEMS` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`ACCOUNT_ID`, `ITEMS`) VALUES
(16, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `ACCOUNT_ID` int NOT NULL,
  `PUBLIC_ID` varchar(255) NOT NULL,
  `STATUS` varchar(255) DEFAULT NULL,
  `PROFILE_NAME` varchar(255) NOT NULL,
  `ACCOUNT_NAME` varchar(255) NOT NULL,
  `REAL_NAME` varchar(255) NOT NULL,
  `VAC_STATUS` tinyint(1) NOT NULL,
  `MAIL` varchar(255) NOT NULL,
  `THEME` int DEFAULT NULL,
  `PROFILE_PICTURE` varchar(255) NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  `BACKGROUND_IMAGE` int DEFAULT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `CURRENCY` int NOT NULL DEFAULT '15',
  `LIBRARY` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`ACCOUNT_ID`, `PUBLIC_ID`, `STATUS`, `PROFILE_NAME`, `ACCOUNT_NAME`, `REAL_NAME`, `VAC_STATUS`, `MAIL`, `THEME`, `PROFILE_PICTURE`, `BACKGROUND_IMAGE`, `PASSWORD`, `CURRENCY`, `LIBRARY`) VALUES
(16, '38765eef-6f5c-461b-99b0-1ac4d3ab1d3d', 'Online', 'Midudev', 'midudev', 'Miguel Angel Duran', 1, 'midudev@gmail.com', 1, 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png', 1, '$2b$10$FPduyHmCNFZhBaTKKgoLheiseaS5zVBoSVwxHI9/.5SthRfsQ.Vq2', 35, '[{\"_id\": \"66a699034ff974caf8bf5b6b\", \"icon\": \"https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/730/f75dd04fa12445a8ec43be65fa16ff1b8d2bf82e.jpg\", \"name\": \"Counter-Strike 2\", \"about\": \"Durante las dos últimas décadas, Counter‑Strike ha proporcionado una experiencia competitiva de primer nivel para los millones de jugadores de todo el mundo que contribuyeron a darle forma. Ahora el próximo capítulo en la historia de CS está a punto de comenzar. Hablamos de Counter‑Strike 2.\\nSiendo una actualización gratuita de CS:GO, Counter‑Strike 2 es el avance técnico más importante en la historia de esta franquicia.\\nDesarrollado con el motor Source 2, Counter‑Strike 2 se ha modernizado con representación basada en la física (PBR, por sus siglas en inglés), conexión a la red de última generación y herramientas actualizadas del Workshop de la comunidad.\\nAdemás del clásico estilo de juego centrado en objetivos del que Counter‑Strike fue pionero en 1999, esta nueva entrega cuenta con las siguientes características:\\n\\nCalificaciones de CS completamente nuevas dentro del modo actualizado Premier.\\nClasificaciones globales y regionales.\\nMapas actualizados y renovados.\\nGranadas de humo dinámicas y revolucionarias.\\nJugabilidad independiente de la frecuencia de tics.\\nEfectos de audio y sonido rediseñados.\\n\\nTodos los objetos de CS:GO presentes en CS2.\", \"links\": {\"url\": \"https://steam-clon-ai-web.vercel.app/app/${_Id}\"}, \"idGame\": \"fe7dab8a-b0fa-483a-b4d7-77414a57ba13\", \"images\": [{\"url\": \"https://cdn.akamai.steamstatic.com/steam/apps/256972298/movie_max_vp9.webm\", \"type\": \"video\"}, {\"url\": \"https://staticg.sportskeeda.com/editor/2023/03/1fe12-16795613684422-1920.jpg\", \"type\": \"image\"}, {\"url\": \"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_796601d9d67faf53486eeb26d0724347cea67ddc.1920x1080.jpg\", \"type\": \"image\"}, {\"url\": \"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_d830cfd0550fbb64d80e803e93c929c3abb02056.1920x1080.jpg\", \"type\": \"image\"}, {\"url\": \"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_18e9ea2715f0407ee05e206073927a648db60d73.1920x1080.jpg\", \"type\": \"image\"}, {\"url\": \"https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_63d2733b9b4ace01a41d5ba8afd653245d05d54a.1920x1080.jpg\", \"type\": \"image\"}], \"features\": [\"Valve Anti-Cheat\", \"In-App Purchases\", \"Cross-Platform Multiplayer\"], \"products\": [{\"name\": \"Counter-Strike 2\", \"price\": {\"format\": \"Dollar\", \"default\": 0}}], \"developer\": {\"url\": \"https://store.steampowered.com/publisher/valve\", \"name\": \"Valve\"}, \"lenguajes\": {\"English\": {\"audio\": true, \"interface\": true, \"subtitles\": false}, \"Spanish\": {\"audio\": false, \"interface\": true, \"subtitles\": false}, \"Japanise\": \"undefined\"}, \"platforms\": {\"Lin\": \"undefined\", \"Mac\": \"undefined\", \"Win\": {\"OS\": \"Windows® 10.\", \"Memory\": \" 8 GB de RAM\", \"DirectX\": \"Versión 11\", \"Storage\": \"85 GB de espacio disponible\", \"Graphics\": \"La tarjeta gráfica de ser de al menos 1 GB y debe ser compatible con DirectX 11 y Shader Model 5.0.\", \"processor\": \"CPU de 4 subprocesos - Intel® Core™ i5 750 o superior.\"}}, \"categories\": [\"FPS\", \"Disparos\", \"Multijugador\", \"Competitivo\"], \"publishers\": [{\"url\": \"https://store.steampowered.com/publisher/valve\", \"name\": \"Valve\"}], \"releaseDate\": \"21-AGO-2012\", \"requirements\": \"undefined\", \"shortDescription\": \"For over two decades, Counter-Strike has offered an elite competitive experience, one shaped by millions of players from across the globe. And now the next chapter in the CS story is about to begin. This is Counter-Strike 2.\", \"downloadableContent\": []}]');

-- --------------------------------------------------------

--
-- Table structure for table `Wishlist`
--

CREATE TABLE `Wishlist` (
  `PUBLIC_ID` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ITEMS` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Wishlist`
--

INSERT INTO `Wishlist` (`PUBLIC_ID`, `ITEMS`) VALUES
('38765eef-6f5c-461b-99b0-1ac4d3ab1d3d', '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`ACCOUNT_ID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`ACCOUNT_ID`),
  ADD UNIQUE KEY `PUBLIC_ID_2` (`PUBLIC_ID`),
  ADD KEY `PUBLIC_ID` (`PUBLIC_ID`);

--
-- Indexes for table `Wishlist`
--
ALTER TABLE `Wishlist`
  ADD PRIMARY KEY (`PUBLIC_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cart`
--
ALTER TABLE `Cart`
  MODIFY `ACCOUNT_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `ACCOUNT_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `User` (`ACCOUNT_ID`);

--
-- Constraints for table `Wishlist`
--
ALTER TABLE `Wishlist`
  ADD CONSTRAINT `Wishlist_ibfk_1` FOREIGN KEY (`PUBLIC_ID`) REFERENCES `User` (`PUBLIC_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
