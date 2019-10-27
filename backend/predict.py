import collections

COLUMNS = [
    'party_name', 'person_family_name', 'document_type_name',
    'person_gender', 'Доход', 'year', 'office_type_name', 'office_name',
    'Супруг(а)_cnt', 'Супруг(а)', 'Ребенок_cnt', 'Ребенок',
    'office_region_name', 'Иное_cnt', 'Иное', 'real_estates_cnt',
    'vehicles_cnt'
]


def flatten(d, parent_key='', sep='_'):
    items = []
    for k, v in d.items():
        if v is not None:
            new_key = parent_key + sep + k if parent_key else k
            if isinstance(v, collections.MutableMapping):
                items.extend(flatten(v, new_key, sep=sep).items())
            elif isinstance(v, list):
                items.append((new_key, v[0] if isinstance(v[0], dict) else '|'.join(sorted(v))))
            else:
                items.append((new_key, v))
    return dict(items)


def relative_grouper(x):
    relative_grouper_dic = {
        'None': 'Доход',
        2: 'Супруг(а)',
        3: 'Ребенок',
        4: 'Ребенок',
        5: 'Иное',
        6: 'Ребенок',
    }

    idx = 'None' if x.get('relative') is None else x.get('relative', {}).get('id')

    return relative_grouper_dic.get(idx, )


def preproc_income(income_list):
    from itertools import groupby
    income_dict = {}
    for k, v in groupby(income_list, key=relative_grouper):
        income_dict[f'{k}'] = 0
        income_dict[f'{k}_cmnt'] = []
        income_dict[f'{k}_cnt'] = 0
        for d in v:
            income_dict[f'{k}'] += d['size'] / 12
            income_dict[f'{k}_cmnt'].append(d['comment'])
            income_dict[f'{k}_cnt'] += 1
        income_dict[f'{k}_cmnt'] = ' '.join(income_dict[f'{k}_cmnt']).strip()
    return income_dict


def preproc_json(decl):

    object_dict_list = []

    ####### incomes
    object_dict_list.append(preproc_income(decl['incomes']))

    ####### main
    main = flatten(decl['main'])
    object_dict_list.append(main)

    ###### real_estates
    object_dict_list.append({'real_estates_cnt': len(decl['real_estates'])})

    ###### vehicles
    object_dict_list.append({'vehicles_cnt': len(decl['vehicles'])})

    result = dict(collections.ChainMap(*[{} if dct is None else dct for dct in object_dict_list]))

    return result


def predict(main_json, score_df):
    d = preproc_json(main_json)
    print(d['office_id'])
    print(d['person_id'])
    predictions_row = score_df[
        (score_df['office_id'] == d['office_id'])
        & (score_df['person_id'] == d['person_id'])
    ].iloc[0]
    prediction = {
        'y_true': str(predictions_row['Доход']),
        'y_predict': str(predictions_row['Предсказание'])
    }
    return prediction
