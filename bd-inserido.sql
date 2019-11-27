-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 27, 2019 at 05:07 PM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wcnbXQoWMJ`
--

-- --------------------------------------------------------

--
-- Table structure for table `compra`
--

CREATE TABLE `compra` (
  `id_compra` int(11) NOT NULL,
  `valor_compra` int(11) DEFAULT NULL,
  `data_compra` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hora_compra` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_usuario` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_loja` int(11) DEFAULT NULL,
  `finalizada` tinyint(1) DEFAULT NULL,
  `local` varchar(55) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`id_compra`, `valor_compra`, `data_compra`, `hora_compra`, `id_usuario`, `id_loja`, `finalizada`, `local`) VALUES
(1, 26, '26/11/2019', '1574817826', '1kx98MI8mtMroaGFE9wiq7LeZty2', 2, 0, 'Sala de Humanidades/Bebedouro'),
(2, 26, '26/11/2019', '1574817959', '1kx98MI8mtMroaGFE9wiq7LeZty2', 2, 1, 'Sala de P.A'),
(3, 13, '26/11/2019', '1574818051', '1kx98MI8mtMroaGFE9wiq7LeZty2', 2, 1, 'Quadra'),
(4, 13, '26/11/2019', '1574818112', '1kx98MI8mtMroaGFE9wiq7LeZty2', 2, 0, 'Auditório'),
(5, 26, '26/11/2019', '1574818242', '1kx98MI8mtMroaGFE9wiq7LeZty2', 2, 0, 'Quadradão'),
(6, 5, '26/11/2019', '1574818258', 'GNonoprIqRb9CUJEQGyLJfmY18u2', 1, 0, 'Auditório'),
(7, 10, '27/11/2019', '1574873820', 'GNonoprIqRb9CUJEQGyLJfmY18u2', 3, 1, 'Sala de Humanidades/Bebedouro'),
(8, 10, '27/11/2019', '1574873869', 'GNonoprIqRb9CUJEQGyLJfmY18u2', 3, 0, 'Sala de P.A'),
(9, 10, '27/11/2019', '1574873908', 'GNonoprIqRb9CUJEQGyLJfmY18u2', 3, 0, 'Quadra');

-- --------------------------------------------------------

--
-- Table structure for table `compra_produto`
--

CREATE TABLE `compra_produto` (
  `id_produto` int(11) DEFAULT NULL,
  `id_compra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `compra_produto`
--

INSERT INTO `compra_produto` (`id_produto`, `id_compra`) VALUES
(3, 1),
(3, 1),
(3, 2),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 5),
(2, 6),
(4, 7),
(4, 7),
(4, 8),
(4, 8),
(4, 9),
(4, 9);

-- --------------------------------------------------------

--
-- Table structure for table `loja`
--

CREATE TABLE `loja` (
  `nome_loja` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photoURL` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descricao` text COLLATE utf8_unicode_ci,
  `id_loja` int(11) NOT NULL,
  `id_dono` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `online` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `loja`
--

INSERT INTO `loja` (`nome_loja`, `photoURL`, `descricao`, `id_loja`, `id_dono`, `online`) VALUES
('Salgados da Júlia', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/1kx98MI8mtMroaGFE9wiq7LeZty2%2Floja?alt=media&token=99d064e2-fd9c-481b-8476-9ba39f0e57cb', 'Essa é a minha Loja! Aproveite!', 1, '1kx98MI8mtMroaGFE9wiq7LeZty2', 1),
('Hamburgueria Boladis', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/GNonoprIqRb9CUJEQGyLJfmY18u2%2Floja?alt=media&token=3ec411dc-6d48-4082-ba15-e2ee20c64c97', 'Essa é a minha Loja! Aproveite!', 2, 'GNonoprIqRb9CUJEQGyLJfmY18u2', 1),
('Giulinha Sandubas', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/bg.jpg?alt=media&token=d79c25fe-35ca-4df2-9986-f2f8696809b0', 'Essa é a minha Loja! Aproveite!', 3, 'kXJlJeCLFiQ6Lih5qy3dp8IK0e03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `produto`
--

CREATE TABLE `produto` (
  `id_produto` int(11) NOT NULL,
  `nome` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photoURL` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descricao` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `categoria` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `id_loja` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `produto`
--

INSERT INTO `produto` (`id_produto`, `nome`, `photoURL`, `descricao`, `categoria`, `valor`, `id_loja`) VALUES
(1, 'Coxinha', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/1kx98MI8mtMroaGFE9wiq7LeZty2%2Ffile044?alt=media&token=dff34b4f-350e-4943-9618-3259f80cac44', 'Coxinha muito boa messsmo', 'Salgados', 7, 1),
(2, 'Joelho de Queijo com Presunto', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/1kx98MI8mtMroaGFE9wiq7LeZty2%2Ffile142?alt=media&token=4bddf65b-91a5-4f34-9797-0b4e15b8071a', 'Salgado muito bom', 'Salgados', 5, 1),
(3, 'Hamburguão Gostoso', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/GNonoprIqRb9CUJEQGyLJfmY18u2%2Ffile065?alt=media&token=ebd1dc1e-2fa5-400f-87db-1aa9d7393de8', 'Hamburguer muito bom', 'Sanduíches', 13, 2),
(4, 'Sanduíche de Preso com Queijunto', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/kXJlJeCLFiQ6Lih5qy3dp8IK0e03%2Ffile14?alt=media&token=98e2ea2b-c295-4201-8820-83b7ff709dd3', 'Sandubão Go', 'Sanduíches', 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `matricula` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nome` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photoURL` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `senha` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `turma` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `matricula`, `email`, `nome`, `photoURL`, `senha`, `turma`) VALUES
('1kx98MI8mtMroaGFE9wiq7LeZty2', NULL, 'juliasalgados@salgado.com', 'Júlia Lopes', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/user.png?alt=media&token=1f00508e-a0d3-4d32-a8a1-320c8c95736a', NULL, NULL),
('GNonoprIqRb9CUJEQGyLJfmY18u2', NULL, 'theovini@yahoo.com.br', 'Theo Melo', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/user.png?alt=media&token=1f00508e-a0d3-4d32-a8a1-320c8c95736a', NULL, NULL),
('kXJlJeCLFiQ6Lih5qy3dp8IK0e03', NULL, 'julhacp2@gmail.com', 'Giulia  Fialho', 'https://firebasestorage.googleapis.com/v0/b/paffi-tcc.appspot.com/o/user.png?alt=media&token=1f00508e-a0d3-4d32-a8a1-320c8c95736a', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_loja` (`id_loja`);

--
-- Indexes for table `compra_produto`
--
ALTER TABLE `compra_produto`
  ADD KEY `id_produto` (`id_produto`),
  ADD KEY `id_compra` (`id_compra`);

--
-- Indexes for table `loja`
--
ALTER TABLE `loja`
  ADD PRIMARY KEY (`id_loja`),
  ADD KEY `id_dono` (`id_dono`);

--
-- Indexes for table `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `id_loja` (`id_loja`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compra`
--
ALTER TABLE `compra`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `loja`
--
ALTER TABLE `loja`
  MODIFY `id_loja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `produto`
--
ALTER TABLE `produto`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_loja`) REFERENCES `loja` (`id_loja`);

--
-- Constraints for table `compra_produto`
--
ALTER TABLE `compra_produto`
  ADD CONSTRAINT `compra_produto_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`),
  ADD CONSTRAINT `compra_produto_ibfk_2` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id_compra`);

--
-- Constraints for table `loja`
--
ALTER TABLE `loja`
  ADD CONSTRAINT `loja_ibfk_1` FOREIGN KEY (`id_dono`) REFERENCES `usuario` (`id_usuario`);

--
-- Constraints for table `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `produto_ibfk_1` FOREIGN KEY (`id_loja`) REFERENCES `loja` (`id_loja`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
