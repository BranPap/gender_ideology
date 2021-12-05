### Real-World Probabilities

```{r}
real_dists <- read.csv("real_dists.csv") %>%
  rename(lexeme = Lexeme) %>%
  rename(fem_prop = Proportion.of.Female)
```

```{r}
final_spr <- left_join(final_spr,real_dists,by="lexeme")
```

```{r}
freq_spr_data <- left_join(freq_spr_data,norming_means_neutral)
```

```{r}
final_spr %>%
  ggplot(aes(x=fem_prop,y=indi_mean)) +
  geom_point() + 
  geom_smooth(method="lm")
```

```{r}
final_spr %>%
  filter(trial_congruency=="neutral") %>% 
  ggplot(aes(x=fem_prop,y=indi_mean,label=form)) +
  geom_point() + 
  geom_smooth(method="lm") + 
  geom_text()
```

```{r}
final_spr %>%
  filter(trial_congruency == "neutral") %>%
  ggplot(aes(x=fem_prop,y=resid_rt)) + 
  geom_point() + 
  geom_smooth(method='lm')
```

mutate(c_fem_prop = scale(fem_prop)) %>%
  
  ```{r}
prod_final %>% 
  group_by(lexeme,fem_prop) %>%
  summarize(mean_prop = mean(response_neutral)) %>%
  ggplot(aes(x=fem_prop,y=mean_prop,label=lexeme)) +
  geom_point() +
  geom_text() +
  geom_smooth(method="lm")
```