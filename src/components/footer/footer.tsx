import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Link, Typography } from '@material-ui/core';
import { getVersion, linkTelegramAccount } from '../../services/api.service';
import { useEffectCallback } from '../../helpers/common.helper';
import { AuthContext } from '../../interfaces/auth-context.interface';
import TelegramLoginWidget from '../telegram/telegram-login-widget';
import { useDispatch } from 'react-redux';
import { showError } from '../../actions/error.actions';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '2vh',
      color: theme.palette.type === 'dark'
        ? theme.palette.secondary.dark
        : theme.palette.secondary.light,
      backgroundColor: theme.palette.background.default,
    },
    boxMargin: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5)
    }
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);
  const [version, setVersion] = useState<string>();
  const [isLoadingVersion, setLoadingVersion] = useState<boolean>(true);

  const loadVersion = useEffectCallback({
    asyncFunctions: [getVersion],
    successActions: [(version: any) => {
      setVersion(version);
      setLoadingVersion(false);
    }],
    errorActions: [(err: any) => {
      console.log(`Getting version error: ${err}`)
    }]
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadVersion, []);

  const handleTelegramAuth = async (telegramUser: any) => {
    try {
      await linkTelegramAccount(telegramUser);
      console.log('Telegram account linked successfully');
      const bot = process.env.REACT_APP_TELEGRAM_BOT_USERNAME || '';
      if (bot) {
        // Open bot chat after successful linking
        window.open(`https://t.me/${bot}`, '_blank');
      }
    } catch (error) {
      console.error('Failed to link Telegram account:', error);
      dispatch(showError('Failed to link Telegram account'));
    }
  };

  return (
    <footer className={classes.root}>
      {
        !isLoadingVersion &&
        <Box className={classes.boxMargin}>
            <Typography variant="subtitle2">
                v{version}
            </Typography>
        </Box>
      }
      <Box className={classes.boxMargin}>
        <Typography variant="subtitle2">
          Developed by R.Gasymov
        </Typography>
      </Box>
      <Box className={classes.boxMargin}>
        <Link color="inherit" href="https://github.com/gasymovrv/money-manager-front">
          <Typography variant="subtitle2">Github</Typography>
        </Link>
      </Box>
      {user.id && (
        <Box className={classes.boxMargin} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Typography variant="subtitle2">
            Telegram Bot:
          </Typography>
          <TelegramLoginWidget
            botUsername={process.env.REACT_APP_TELEGRAM_BOT_USERNAME || ''}
            onAuth={handleTelegramAuth}
          />
        </Box>
      )}
    </footer>
  )
}

export default Footer;
