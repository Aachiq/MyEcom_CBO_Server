-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2023 at 01:21 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myecom_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Web'),
(2, 'Mobile'),
(3, 'Artificial Intelligence'),
(4, 'Big Data'),
(5, 'Cyber Security');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `quantity_order` int(11) NOT NULL,
  `total_product` float NOT NULL,
  `date_order` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_type` varchar(50) NOT NULL,
  `address_delivery` text DEFAULT NULL,
  `phone` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `id_product`, `id_user`, `quantity_order`, `total_product`, `date_order`, `payment_type`, `address_delivery`, `phone`) VALUES
(7, 1, 10, 10, 130, '2023-08-08 11:20:02', 'cash', 'fccaca', '14234124'),
(8, 5, 10, 10, 610, '2023-08-08 11:20:02', 'cash', 'fccaca', '14234124'),
(9, 1, 10, 10, 130, '2023-08-08 11:20:02', 'cash', 'fccaca', '14234124');

-- --------------------------------------------------------

--
-- Table structure for table `order_mvp`
--

CREATE TABLE `order_mvp` (
  `id` int(11) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date_order` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_mvp`
--

INSERT INTO `order_mvp` (`id`, `phone`, `address`, `id_product`, `id_user`, `date_order`, `payment_type`) VALUES
(4, '2313231', 'dzadazd', 8, 10, '2023-08-08 19:33:36', 'cash'),
(5, '065-308-5446', 'adazdazaze\":130,\"quanti', 8, 10, '2023-08-08 19:34:06', 'cash'),
(15, 'azdzd', 'zdzadzadazd', 6, 15, '2023-08-11 15:15:34', 'cash'),
(90, '1', 'order with pdf1', 2, 10, '2023-08-13 12:28:23', 'cash'),
(91, '14234124', 'adazdad\"addada', 7, 15, '2023-08-13 12:49:29', 'cash'),
(92, '23213123', 'FDZEFZEFEZFEZFEZFZF', 6, 15, '2023-08-13 13:59:31', 'cash'),
(93, '777777777777777', 'fzef heeeeeeeeeeeeeeeeeeemmmm', 1, 15, '2023-08-13 16:51:21', 'cash'),
(97, '2313231', 'ddddddddddddddd', 5, 15, '2023-08-13 17:44:28', 'cash'),
(98, '2313231', 'DAZDADAZD', 5, 15, '2023-08-13 17:48:40', 'cash'),
(108, '1', 'order with pdf&à HEY', 2, 10, '2023-08-13 12:28:23', 'cash'),
(109, '55555', 'order with pdf999999', 5, 10, '2023-08-13 19:12:34', 'cash'),
(110, '444444443', 'HRKLLO CASA Z', 6, 10, '2023-08-13 19:20:33', 'cash'),
(111, '2147483', 'azdadaz', 5, 10, '2023-08-13 19:23:09', 'cash');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` text NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `quantity`, `image`, `id_category`) VALUES
(1, 'Learn Java from Scratch', 'Java is a versatile, object-oriented language used to build robust, platform-independent applications. Its \'write once, run anywhere\' feature makes it ideal for diverse development needs, from desktop to mobile and enterprise-level systems.', 13, 10, 'book1.png', 1),
(2, 'Security for beginners', 'Cybersecurity practices protect systems and data from unauthorized access. Robust encryption, secure coding, and advanced authentication mechanisms ensure data confidentiality, integrity, and availability.', 20, 10, 'book2.png', 5),
(3, 'Start Mobile Development', 'Frameworks like React Native and Flutter allow developers to build mobile apps for multiple platforms using one codebase. It saves time, resources, and delivers consistent user experiences across devices.', 26, 10, 'book3.png', 2),
(4, 'Big Data World', 'Big Data technologies like Hadoop and Apache Spark process vast datasets, revealing valuable insights. These tools enable distributed data storage and analytics, empowering data-driven decisions and revolutionizing industries.', 50, 10, 'book4.png', 4),
(5, 'Native Mobile Carrer', 'Frameworks like React Native and Flutter allow developers to build mobile apps for multiple platforms using one codebase. It saves time, resources, and delivers consistent user experiences across devices.', 61, 10, 'book5.png', 2),
(6, 'Javascript EveryWhere', 'JavaScript powers dynamic web interfaces, adding interactivity and real-time updates to web pages. Coupled with popular frameworks like React or Angular, it facilitates creating responsive Single Page Applications (SPAs) with seamless user experiences.', 73, 10, 'book6.png', 1),
(7, 'AI with Python', 'AI technologies like Hadoop and Apache Spark process vast datasets, revealing valuable insights. These tools enable distributed data storage and analytics, empowering data-driven decisions and revolutionizing industries.', 100, 10, 'book7.png', 3),
(8, 'Machine Learning', 'learning for machine is power, adding interactivity and real-time updates to web pages. Coupled with popular frameworks like React or Angular, it facilitates creating responsive Single Page Applications (SPAs) with seamless user experiences.', 130, 10, 'book8.png', 3);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `date_review` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `comment`, `id_user`, `id_product`, `date_review`) VALUES
(1, 'Hello good ! je recommende this !', 3, 1, '2023-08-04 11:36:04'),
(2, 'coco get reviews Wowo of specifc Product.\r\n', 4, 1, '2023-08-04 11:36:04'),
(3, 'Cje recommende this !', 5, 1, '2023-08-04 09:36:04'),
(11, 'it\'s good but missed design', 2, 1, '2023-08-06 13:33:20'),
(24, 'wow i benefit a lot', 10, 5, '2023-08-08 18:34:27'),
(26, 'amazing course !', 10, 8, '2023-08-08 18:35:07'),
(48, 'ddazdazdazda', 15, 7, '2023-08-13 12:46:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `email` text NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `phone`, `city`, `email`, `password`) VALUES
(2, 'Kamal', '233434324', 'casa', 'asas@gmail.com', '$2a$08$gRO8iwYc6fWkZ6lRXFH3M.Rvww2NZ.j5xcsV.Ns9U76Ni.m6xTZGC'),
(3, 'Frank', '98672822', 'casa', 'asas@gmail.com', '$2a$08$gRO8iwYc6fWkZ6lRXFH3M.Rvww2NZ.j5xcsV.Ns9U76Ni.m6xTZGC'),
(4, 'Sami', '573434324', 'Rabar', 'sami@gmail.com', '$2a$08$gRO8iwYc6fWkZ6lRXFH3M.Rvww2NZ.j5xcsV.Ns9U76Ni.m6xTZGC'),
(5, 'Frank', '98672822', 'casa', 'asas@gmail.com', '$2a$08$gRO8iwYc6fWkZ6lRXFH3M.Rvww2NZ.j5xcsV.Ns9U76Ni.m6xTZGC'),
(8, 'jhon', '1111212', 'Madrid', 'jhon@gmail.com', '$2a$08$8qh9vG1kezY.TW0ctp4ae.mJ/5i44CrbNEqwpB7Ff8hcACs5P1DA6'),
(10, 'Elhocine Aachiq', '2313231', 'casablanca', 'hocine.aachiq@gmail.com', '$2a$08$ntcEGbWVdybmY9B/jz.HbuKNiCFbMyZWZb0SpX7M5hhLz/b.uDA8S'),
(12, 'hocine', '08764221', 'Madrid', 'hocine.aachiq@gmail.com', '$2a$08$BbytEjt16WzWH63WIluAq.RWAd4CXApEhRIvRtoEb6CVL15Rk.6PO'),
(15, 'aziz', '1', 'Madrid', 'aziz@gmail.com', '$2a$08$4MxmHPmaeYnP5ZT7/KhQiupAm2sEJ1pej36iHKktVLepj6ovDI5eS');

-- --------------------------------------------------------

--
-- Table structure for table `users_cbo`
--

CREATE TABLE `users_cbo` (
  `id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_cbo`
--

INSERT INTO `users_cbo` (`id`, `login`, `password`, `status`) VALUES
(1, 'agent', 'agent123', 'agent'),
(2, 'admin', 'admin123', 'admin'),
(3, 'profilTaux', 'taux123', 'profilTaux');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_mvp`
--
ALTER TABLE `order_mvp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_cbo`
--
ALTER TABLE `users_cbo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_mvp`
--
ALTER TABLE `order_mvp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users_cbo`
--
ALTER TABLE `users_cbo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
