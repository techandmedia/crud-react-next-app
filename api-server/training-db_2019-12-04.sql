-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Dec 04, 2019 at 09:45 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `training`
--

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `index_dosen` int(2) NOT NULL,
  `id_dosen` varchar(5) NOT NULL,
  `nama_dosen` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`index_dosen`, `id_dosen`, `nama_dosen`, `created`, `modified`) VALUES
(1, '04', 'Ir. Yogasetya Suhanda, M.Sc', '2018-11-12 12:50:00', '2019-03-02 11:09:24'),
(2, '98', 'V. Kun Marjonohadi, S.Sos, MM', '2018-11-12 12:10:29', '2019-03-02 11:09:52'),
(3, '06', 'Nur Sucahyo, S,Si., MM', '2018-11-12 12:11:21', '2019-03-02 11:10:09'),
(4, '0700', 'Jelman Nasri, S.Kom., SE., MM.', '2018-11-12 12:11:21', '2019-03-02 11:15:38'),
(5, '07', 'Ir. Indra Hiswara, MM', '2018-11-12 12:12:33', '2019-03-02 11:15:42'),
(6, '35', 'Abdul Aziz Effendy, S.Kom., M.Kom', '2018-11-12 12:12:33', '2019-03-02 11:10:56'),
(7, '94', 'Heru Winarno, S.Kom., MM', '2018-11-12 12:17:20', '2019-03-02 11:11:09'),
(8, '1170', 'Dhila Franzely Dimas, S.Kom., MM.Si', '2018-11-12 12:17:20', '2019-03-02 11:12:16'),
(9, '114', 'Abdul Manan, S.Kom., M.Kom', '2018-11-12 12:17:20', '2019-03-02 11:12:22'),
(10, '157', 'Muhamad Yasin, S.Kom.', '2018-11-12 12:17:20', '2019-03-02 11:12:43'),
(11, '158', 'Slamet Didik Agus Kurniawan, S.Kom', '2018-11-12 12:17:20', '2019-03-02 11:12:53'),
(12, '117', 'Dartono, S.Kom., M.Kom', '2018-11-12 12:17:20', '2019-03-02 11:12:59'),
(13, '162', 'Jody Ridwan Arief, S.Kom', '2018-11-12 12:17:20', '2019-03-02 11:13:09'),
(14, '52', 'Adi Sopian, S.Kom., M.Kom', '2018-11-12 12:17:20', '2019-03-02 11:13:15'),
(15, '161', 'Baharini Kurnia Putri, S.Kom., M.Pd.', '2018-11-12 12:17:20', '2019-03-02 11:13:26'),
(16, '109', 'Usanto, S.Kom., M.Kom', '2018-11-12 12:17:20', '2019-03-02 11:13:31'),
(17, '1260', 'Amirudin Kurdi, S.Ag, MM', '2018-11-12 12:17:20', '2019-03-02 11:13:46'),
(18, '14', 'Drs. Satrio Broto, MM', '2018-11-12 12:17:20', '2019-03-02 11:13:50'),
(19, '119', 'Ike Kurniati, S.Kom., M. Kom', '2018-11-12 12:17:20', '2019-03-02 11:13:56'),
(20, '115', 'Andy Dharmalau, S.Kom, M.Kom', '2018-11-12 12:17:20', '2019-03-02 11:14:18'),
(21, '28', 'Lela Nurlaela, ST., M.Kom', '2019-03-02 11:05:41', '2019-03-02 11:09:35'),
(22, '9999', 'Eko Andri Suabrnant', '2019-11-28 09:39:42', '2019-11-28 09:39:42'),
(23, '9998', 'Eko Andri Subarnanto 11', '2019-11-28 09:42:02', '2019-11-28 09:42:02'),
(24, '9997', 'Eko Andri Subarnanto 1122', '2019-11-28 09:45:36', '2019-11-28 09:45:36'),
(25, '1099', 'Eko Andri Subarnanto 123', '2019-11-28 09:47:25', '2019-11-28 09:47:25'),
(26, '10991', 'Eko Andri Subarnanto 123', '2019-11-28 09:59:45', '2019-11-28 09:59:45');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id_login` int(4) NOT NULL,
  `id_group` int(5) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id_login`, `id_group`, `user_name`, `password`, `created`, `modified`) VALUES
(22, 10001, 'eko.andri@icloud.com', '111', '2019-12-03 10:11:22', '2019-12-03 10:11:41'),
(23, 10005, 'adi.sopian@gmail.com', '111', '2019-12-03 10:12:44', '2019-12-03 10:13:13'),
(24, 10005, 'eko.andri@gmail.com', '111', '2019-12-03 10:14:17', '2019-12-04 02:13:04');

-- --------------------------------------------------------

--
-- Table structure for table `time_table`
--

CREATE TABLE `time_table` (
  `id_time_table` int(4) NOT NULL,
  `id_group` int(5) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `notes_one` varchar(255) NOT NULL,
  `notes_two` text NOT NULL,
  `notes_three` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `time_table`
--

INSERT INTO `time_table` (`id_time_table`, `id_group`, `user_name`, `notes_one`, `notes_two`, `notes_three`, `created`, `modified`) VALUES
(17, 10010, 'eko.andri@gmail.com', 'User Task', 'User User task', 'user nih change to green', '2019-12-03 10:16:05', '2019-12-04 03:11:18'),
(18, 10005, 'adi.sopian@gmail.com', 'Manager Login', 'Mana', 'Manager to green', '2019-12-03 10:16:53', '2019-12-04 03:08:45'),
(19, 10001, 'eko.andri@icloud.com', 'Admn coba', 'Admin', 'Admin Change to green', '2019-12-03 10:17:17', '2019-12-04 03:07:07'),
(20, 10001, 'eko.andri@icloud.com', 'Please', 'Wed', 'Why Not CHnage! Please', '2019-12-04 03:10:48', '2019-12-04 09:24:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_full_name` varchar(50) NOT NULL,
  `user_address` varchar(150) NOT NULL,
  `user_phone_number` varchar(20) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `user_name`, `user_full_name`, `user_address`, `user_phone_number`, `created`, `modified`) VALUES
(22, 'eko.andri@icloud.com', 'Eko Andri Subarnanto', 'Jl STM Walang Jaya RT 001/03 No 20', '6208117011090', '2019-12-03 10:11:22', '2019-12-03 10:11:22'),
(23, 'adi.sopian@gmail.com', 'Adi Sopian', 'Jakarta', '62123', '2019-12-03 10:12:44', '2019-12-03 10:12:44'),
(24, 'eko.andri@gmail.com', 'Eko Andri Subarnanto', 'Jl STM Walang Jaya RT 001/03 No 20', '6208117011090', '2019-12-03 10:14:17', '2019-12-03 10:14:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `id_group` int(5) NOT NULL,
  `group_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`id_group`, `group_name`) VALUES
(10001, 'admin'),
(10005, 'manager'),
(10010, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user_preference`
--

CREATE TABLE `user_preference` (
  `id_preference` int(5) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `working_hour_per_day` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_preference`
--

INSERT INTO `user_preference` (`id_preference`, `user_name`, `working_hour_per_day`) VALUES
(5, 'eko.andri@icloud.com', 8),
(6, 'adi.sopian@gmail.com', 8),
(7, 'eko.andri@gmail.com', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`index_dosen`),
  ADD UNIQUE KEY `id_dosen` (`id_dosen`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`),
  ADD KEY `user_name` (`user_name`);

--
-- Indexes for table `time_table`
--
ALTER TABLE `time_table`
  ADD PRIMARY KEY (`id_time_table`),
  ADD KEY `user_name` (`user_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `user_name` (`user_name`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`id_group`);

--
-- Indexes for table `user_preference`
--
ALTER TABLE `user_preference`
  ADD PRIMARY KEY (`id_preference`),
  ADD KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dosen`
--
ALTER TABLE `dosen`
  MODIFY `index_dosen` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `time_table`
--
ALTER TABLE `time_table`
  MODIFY `id_time_table` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `user_preference`
--
ALTER TABLE `user_preference`
  MODIFY `id_preference` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
